import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

interface RegisterDoctorFormProps {
  onSuccess?: () => void;
}

const RegisterDoctorForm = ({ onSuccess }: RegisterDoctorFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    specialty: '',
    experienceYears: '',
    education: '',
    licenseNumber: '',
    price: '',
    isFree: false,
    bio: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const specialties = [
    'Терапевт',
    'Кардиолог',
    'Дерматолог',
    'Невролог',
    'Педиатр',
    'Эндокринолог',
    'Гастроэнтеролог',
    'Офтальмолог'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Введите ФИО';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    }

    if (!formData.specialty) {
      newErrors.specialty = 'Выберите специальность';
    }

    if (!formData.experienceYears) {
      newErrors.experienceYears = 'Введите опыт работы';
    } else if (parseInt(formData.experienceYears) < 0 || parseInt(formData.experienceYears) > 60) {
      newErrors.experienceYears = 'Некорректный опыт работы';
    }

    if (!formData.education.trim()) {
      newErrors.education = 'Введите образование';
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'Введите номер лицензии';
    }

    if (!formData.isFree && !formData.price) {
      newErrors.price = 'Укажите стоимость или выберите бесплатные консультации';
    }

    if (!formData.password) {
      newErrors.password = 'Введите пароль';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://functions.poehali.dev/edcaea50-161c-4491-9dcf-fc6cec37611c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          specialty: formData.specialty,
          experienceYears: parseInt(formData.experienceYears),
          education: formData.education,
          licenseNumber: formData.licenseNumber,
          price: formData.isFree ? 0 : parseFloat(formData.price),
          isFree: formData.isFree,
          bio: formData.bio,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Регистрация успешна!',
          description: 'Ваш профиль отправлен на модерацию',
        });
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          specialty: '',
          experienceYears: '',
          education: '',
          licenseNumber: '',
          price: '',
          isFree: false,
          bio: '',
          password: '',
          confirmPassword: ''
        });
        if (onSuccess) onSuccess();
      } else {
        toast({
          title: 'Ошибка регистрации',
          description: data.error || 'Попробуйте позже',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось связаться с сервером',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center space-x-2 mb-2">
          <div className="bg-purple-100 p-2 rounded-full">
            <Icon name="Stethoscope" size={24} className="text-secondary" />
          </div>
          <CardTitle className="text-2xl">Регистрация врача</CardTitle>
        </div>
        <CardDescription>Создайте профиль специалиста для консультаций</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">ФИО *</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Иванов Иван Иванович"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className={errors.fullName ? 'border-red-500' : ''}
              />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="doctor@example.ru"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+7 (900) 123-45-67"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialty">Специальность *</Label>
              <Select value={formData.specialty} onValueChange={(value) => handleChange('specialty', value)}>
                <SelectTrigger className={errors.specialty ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Выберите специальность" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.specialty && <p className="text-sm text-red-500">{errors.specialty}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experienceYears">Опыт работы (лет) *</Label>
            <Input
              id="experienceYears"
              type="number"
              min="0"
              max="60"
              placeholder="10"
              value={formData.experienceYears}
              onChange={(e) => handleChange('experienceYears', e.target.value)}
              className={errors.experienceYears ? 'border-red-500' : ''}
            />
            {errors.experienceYears && <p className="text-sm text-red-500">{errors.experienceYears}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">Образование *</Label>
            <Textarea
              id="education"
              placeholder="Укажите ваше образование: ВУЗ, год окончания, специальность"
              value={formData.education}
              onChange={(e) => handleChange('education', e.target.value)}
              className={errors.education ? 'border-red-500' : ''}
              rows={3}
            />
            {errors.education && <p className="text-sm text-red-500">{errors.education}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="licenseNumber">Номер медицинской лицензии *</Label>
            <Input
              id="licenseNumber"
              type="text"
              placeholder="ЛО-77-01-123456"
              value={formData.licenseNumber}
              onChange={(e) => handleChange('licenseNumber', e.target.value)}
              className={errors.licenseNumber ? 'border-red-500' : ''}
            />
            {errors.licenseNumber && <p className="text-sm text-red-500">{errors.licenseNumber}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">О себе</Label>
            <Textarea
              id="bio"
              placeholder="Расскажите о себе, своих достижениях и подходе к работе"
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
            <Switch
              id="isFree"
              checked={formData.isFree}
              onCheckedChange={(checked) => handleChange('isFree', checked)}
            />
            <Label htmlFor="isFree" className="cursor-pointer">
              Бесплатные консультации
            </Label>
          </div>

          {!formData.isFree && (
            <div className="space-y-2">
              <Label htmlFor="price">Стоимость консультации (руб.) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="100"
                placeholder="1500"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Пароль *</Label>
              <Input
                id="password"
                type="password"
                placeholder="Минимум 6 символов"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className={errors.password ? 'border-red-500' : ''}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Подтвердите пароль *</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Повторите пароль"
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                className={errors.confirmPassword ? 'border-red-500' : ''}
              />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                Регистрация...
              </>
            ) : (
              <>
                <Icon name="UserPlus" size={18} className="mr-2" />
                Зарегистрироваться как врач
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterDoctorForm;