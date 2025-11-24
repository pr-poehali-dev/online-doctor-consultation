import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const doctors = [
    {
      id: 1,
      name: 'Доктор Анна Петрова',
      specialty: 'Терапевт',
      experience: '15 лет',
      rating: 4.9,
      reviews: 234,
      price: 1500,
      isFree: false,
      image: 'https://cdn.poehali.dev/projects/887dcd32-1294-4206-a1ed-07075534e7c7/files/e2a5be80-4cd2-42b8-a8dd-18c736ca9225.jpg',
      status: 'online'
    },
    {
      id: 2,
      name: 'Доктор Иван Смирнов',
      specialty: 'Кардиолог',
      experience: '12 лет',
      rating: 4.8,
      reviews: 189,
      price: 2000,
      isFree: false,
      image: 'https://cdn.poehali.dev/projects/887dcd32-1294-4206-a1ed-07075534e7c7/files/82c4af1b-d728-4c9a-a704-6c9403cf1c21.jpg',
      status: 'online'
    },
    {
      id: 3,
      name: 'Доктор Елена Волкова',
      specialty: 'Дерматолог',
      experience: '10 лет',
      rating: 4.9,
      reviews: 156,
      price: 0,
      isFree: true,
      image: 'https://cdn.poehali.dev/projects/887dcd32-1294-4206-a1ed-07075534e7c7/files/e2a5be80-4cd2-42b8-a8dd-18c736ca9225.jpg',
      status: 'offline'
    },
  ];

  const consultations = [
    {
      id: 1,
      doctor: 'Доктор Анна Петрова',
      specialty: 'Терапевт',
      date: '15 ноября 2024',
      status: 'active',
      lastMessage: 'Рекомендую сдать анализы',
      unread: 2
    },
    {
      id: 2,
      doctor: 'Доктор Иван Смирнов',
      specialty: 'Кардиолог',
      date: '10 ноября 2024',
      status: 'completed',
      lastMessage: 'Спасибо за консультацию',
      unread: 0
    }
  ];

  const reviews = [
    {
      id: 1,
      author: 'Мария К.',
      doctor: 'Доктор Анна Петрова',
      rating: 5,
      date: '20 ноября 2024',
      text: 'Отличный специалист! Очень внимательная и профессиональная. Дала исчерпывающие ответы на все вопросы.'
    },
    {
      id: 2,
      author: 'Алексей В.',
      doctor: 'Доктор Иван Смирнов',
      rating: 5,
      date: '18 ноября 2024',
      text: 'Быстрая консультация, всё понятно объяснил. Рекомендую!'
    },
    {
      id: 3,
      author: 'Ольга М.',
      doctor: 'Доктор Елена Волкова',
      rating: 4,
      date: '15 ноября 2024',
      text: 'Хороший врач, помогла разобраться с проблемой. Немного долго ждала ответа.'
    }
  ];

  const faqs = [
    {
      question: 'Как записаться на консультацию?',
      answer: 'Выберите врача в каталоге, нажмите кнопку "Записаться на консультацию" и следуйте инструкциям. После оплаты (для платных консультаций) вы сможете начать общение с врачом.'
    },
    {
      question: 'Сколько стоит консультация?',
      answer: 'Стоимость консультации зависит от специалиста и варьируется от бесплатных до 2000 рублей. Все цены указаны в карточке врача.'
    },
    {
      question: 'Как быстро врач ответит на мой вопрос?',
      answer: 'Большинство врачей отвечают в течение 1-3 часов. Время ответа зависит от загруженности специалиста.'
    },
    {
      question: 'Можно ли получить рецепт?',
      answer: 'Да, врач может выписать электронный рецепт, который вы сможете использовать в аптеке.'
    },
    {
      question: 'Конфиденциальна ли консультация?',
      answer: 'Да, все консультации строго конфиденциальны и защищены в соответствии с законодательством о персональных данных.'
    }
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="HeartPulse" size={32} className="text-primary" />
              <span className="text-2xl font-bold text-primary">МедКонсульт</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-primary transition-colors">Главная</button>
              <button onClick={() => scrollToSection('doctors')} className="text-gray-700 hover:text-primary transition-colors">Врачи</button>
              <button onClick={() => scrollToSection('consultations')} className="text-gray-700 hover:text-primary transition-colors">Консультации</button>
              <button onClick={() => scrollToSection('reviews')} className="text-gray-700 hover:text-primary transition-colors">Отзывы</button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-700 hover:text-primary transition-colors">FAQ</button>
              <button onClick={() => scrollToSection('contacts')} className="text-gray-700 hover:text-primary transition-colors">Контакты</button>
            </div>

            <div className="flex items-center space-x-3">
              <Button variant="outline">Войти</Button>
              <Button>Регистрация</Button>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="py-20 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-secondary/10 text-secondary hover:bg-secondary/20">Онлайн консультации 24/7</Badge>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Консультации врачей онлайн
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Получите профессиональную медицинскую помощь не выходя из дома. Платные и бесплатные консультации от квалифицированных специалистов.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Button size="lg" className="text-lg px-8" onClick={() => scrollToSection('doctors')}>
                  Найти врача
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Как это работает
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">200+</div>
                  <div className="text-sm text-gray-600">Врачей</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">50K+</div>
                  <div className="text-sm text-gray-600">Консультаций</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">4.9</div>
                  <div className="text-sm text-gray-600">Рейтинг</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://cdn.poehali.dev/projects/887dcd32-1294-4206-a1ed-07075534e7c7/files/627f4a31-de69-46ca-9934-84ab909e8392.jpg" 
                alt="Консультация врача" 
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl animate-scale-in">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Icon name="CheckCircle" size={24} className="text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold">Быстрый ответ</div>
                    <div className="text-sm text-gray-600">В течение 1-3 часов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Video" size={32} className="text-primary" />
                </div>
                <CardTitle>Онлайн чаты</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Общайтесь с врачом в удобном формате через текстовые сообщения</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Shield" size={32} className="text-secondary" />
                </div>
                <CardTitle>Конфиденциально</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Ваши данные надежно защищены и не передаются третьим лицам</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Clock" size={32} className="text-green-600" />
                </div>
                <CardTitle>24/7 доступ</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Получите консультацию в любое удобное для вас время</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Icon name="DollarSign" size={32} className="text-orange-600" />
                </div>
                <CardTitle>Доступные цены</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Платные и бесплатные консультации на выбор</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="doctors" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Наши специалисты</h2>
            <p className="text-xl text-gray-600">Выберите врача по специальности</p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="all">Все врачи</TabsTrigger>
              <TabsTrigger value="therapist">Терапевты</TabsTrigger>
              <TabsTrigger value="cardio">Кардиологи</TabsTrigger>
              <TabsTrigger value="derma">Дерматологи</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="animate-fade-in">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <Card key={doctor.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <Avatar className="w-20 h-20">
                            <AvatarImage src={doctor.image} alt={doctor.name} />
                            <AvatarFallback>{doctor.name.split(' ')[1][0]}{doctor.name.split(' ')[2][0]}</AvatarFallback>
                          </Avatar>
                          {doctor.status === 'online' && (
                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{doctor.name}</CardTitle>
                          <CardDescription>{doctor.specialty}</CardDescription>
                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            <Icon name="Briefcase" size={14} className="mr-1" />
                            {doctor.experience}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="font-semibold">{doctor.rating}</span>
                          <span className="text-gray-600 text-sm ml-1">({doctor.reviews} отзывов)</span>
                        </div>
                        {doctor.isFree ? (
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">Бесплатно</Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">{doctor.price} ₽</Badge>
                        )}
                      </div>
                      <Button className="w-full" variant={doctor.status === 'online' ? 'default' : 'outline'}>
                        <Icon name="MessageCircle" size={18} className="mr-2" />
                        Записаться на консультацию
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="therapist">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.filter(d => d.specialty === 'Терапевт').map((doctor) => (
                  <Card key={doctor.id} className="hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src={doctor.image} alt={doctor.name} />
                          <AvatarFallback>{doctor.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{doctor.name}</CardTitle>
                          <CardDescription>{doctor.specialty}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cardio">
              <div className="text-center py-12 text-gray-600">Фильтр по кардиологам</div>
            </TabsContent>

            <TabsContent value="derma">
              <div className="text-center py-12 text-gray-600">Фильтр по дерматологам</div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="consultations" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Мои консультации</h2>
            <p className="text-xl text-gray-600">История ваших обращений к врачам</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="active">Активные</TabsTrigger>
                <TabsTrigger value="completed">Завершенные</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {consultations.filter(c => c.status === 'active').map((consultation) => (
                  <Card key={consultation.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-14 h-14">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>{consultation.doctor[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{consultation.doctor}</CardTitle>
                            <CardDescription>{consultation.specialty}</CardDescription>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700">Активна</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-700 mb-1">{consultation.lastMessage}</p>
                          <p className="text-sm text-gray-500">{consultation.date}</p>
                        </div>
                        {consultation.unread > 0 && (
                          <Badge variant="destructive" className="rounded-full">{consultation.unread}</Badge>
                        )}
                      </div>
                      <Button className="w-full mt-4">
                        <Icon name="MessageCircle" size={18} className="mr-2" />
                        Открыть чат
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {consultations.filter(c => c.status === 'completed').map((consultation) => (
                  <Card key={consultation.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-14 h-14">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>{consultation.doctor[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{consultation.doctor}</CardTitle>
                            <CardDescription>{consultation.specialty}</CardDescription>
                          </div>
                        </div>
                        <Badge className="bg-gray-100 text-gray-700">Завершена</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-1">{consultation.lastMessage}</p>
                      <p className="text-sm text-gray-500">{consultation.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Отзывы пациентов</h2>
            <p className="text-xl text-gray-600">Что говорят наши пациенты</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg">{review.author}</CardTitle>
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <CardDescription>{review.doctor} • {review.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Показать все отзывы
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h2>
            <p className="text-xl text-gray-600">Ответы на популярные вопросы</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Контакты и поддержка</h2>
            <p className="text-xl text-gray-600">Мы всегда готовы помочь</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Mail" size={32} className="text-primary" />
                </div>
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-medium">support@medconsult.ru</p>
                <p className="text-sm text-gray-600 mt-2">Ответим в течение 24 часов</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Icon name="Phone" size={32} className="text-green-600" />
                </div>
                <CardTitle>Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 font-medium">8 (800) 555-35-35</p>
                <p className="text-sm text-gray-600 mt-2">Бесплатно по России</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Icon name="MessageCircle" size={32} className="text-secondary" />
                </div>
                <CardTitle>Онлайн-чат</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="mt-2">Начать чат</Button>
                <p className="text-sm text-gray-600 mt-2">Быстрая помощь 24/7</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="HeartPulse" size={28} className="text-primary" />
                <span className="text-xl font-bold">МедКонсульт</span>
              </div>
              <p className="text-gray-400">Профессиональные медицинские консультации онлайн</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Консультации</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Каталог врачей</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Цены</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Вакансии</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Поддержка</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 МедКонсульт. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
