import json
import os
import hashlib
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Register new doctor account with validation
    Args: event - dict with httpMethod, body (fullName, email, phone, specialty, etc.)
          context - object with attributes: request_id, function_name
    Returns: HTTP response dict with doctor data or error
    '''
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    full_name = body_data.get('fullName', '').strip()
    email = body_data.get('email', '').strip().lower()
    phone = body_data.get('phone', '').strip()
    specialty = body_data.get('specialty', '').strip()
    experience_years = body_data.get('experienceYears', 0)
    education = body_data.get('education', '').strip()
    license_number = body_data.get('licenseNumber', '').strip()
    price = body_data.get('price', 0)
    is_free = body_data.get('isFree', False)
    bio = body_data.get('bio', '').strip()
    password = body_data.get('password', '')
    
    if not all([full_name, email, phone, specialty, education, license_number, password]):
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Все обязательные поля должны быть заполнены'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database connection error'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute("SELECT id FROM doctors WHERE email = %s", (email,))
    existing = cur.fetchone()
    
    if existing:
        cur.close()
        conn.close()
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Email уже зарегистрирован'}),
            'isBase64Encoded': False
        }
    
    password_hash = hash_password(password)
    
    cur.execute(
        """INSERT INTO doctors 
        (full_name, email, phone, specialty, experience_years, education, license_number, 
         price, is_free, bio, password_hash, status) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) 
        RETURNING id, full_name, email, specialty, created_at""",
        (full_name, email, phone, specialty, experience_years, education, license_number,
         price, is_free, bio, password_hash, 'offline')
    )
    
    doctor = cur.fetchone()
    conn.commit()
    cur.close()
    conn.close()
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'success': True,
            'doctor': {
                'id': doctor['id'],
                'fullName': doctor['full_name'],
                'email': doctor['email'],
                'specialty': doctor['specialty'],
                'createdAt': doctor['created_at'].isoformat()
            }
        }),
        'isBase64Encoded': False
    }
