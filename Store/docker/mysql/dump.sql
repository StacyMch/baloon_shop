-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `e_mail` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `login` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `user_hash` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `adress` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `Users` (`id`, `name`, `e_mail`, `login`, `password`, `user_hash`, `phone`, `adress`) VALUES
(1,	'Родион',	'rodion@bk.ru',	'rodion',	'strong',	NULL,	NULL,	NULL),
(2,	'n',	'n@ya.ru',	'nn',	'1234',	NULL,	NULL,	NULL),
(3, 'stacymch',	's@ya.ru',	'stacymch',	'shHUjXMxO7Ims',	'shVZhfrhB9VJQ',	'7777777777',	'uuuuuuuuu'),
(4,	'test',	'test',	'ewferf',	'sh48AF4SplA/Q',	'shLSdxGW6z6/Q',	'24224244',	NULL),
(5,	'1',	'1',	'1',	'shoAN5qc.L4Fs',	'shsxxXSvYpUHU',	'123113131',	'Арбат');

DROP TABLE IF EXISTS `basket`;
CREATE TABLE `basket` (
  `goods_id` int unsigned NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `goods_price` mediumint unsigned NOT NULL,
  `goods_img` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `goods_sale` tinyint unsigned DEFAULT NULL,
  `quantity` smallint unsigned DEFAULT NULL,
  PRIMARY KEY (`goods_id`),
  CONSTRAINT `basket_ibfk_1` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `basket` (`goods_id`, `goods_name`, `goods_price`, `goods_img`, `goods_sale`, `quantity`) VALUES
(1,	'0',	0,	'0',	0,	NULL);

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category_img` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `categories` (`category_id`, `category`, `category_img`) VALUES
(1,	'Латексные шары',	'https://ir.ozone.ru/s3/multimedia-p/wc1000/6015837217.jpg'),
(2,	'Фольгированные шары',	'http://arkidutti.ru/image/cache/catalog/product/mimodutti-heart-mint2-600x600.jpg'),
(3,	'Цифры',	'https://megashar-nsk.ru/images/Dlya-detei/gelievue_sharu102.jpg'),
(4,	'3D Сферы',	'https://goo.su/HcfRJ'),
(5,	'Хромовые шары',	'https://ae04.alicdn.com/kf/H4ccf2618aab449c3bb01802f1076eff97/1-50-5-10.jpg_640x640.jpg');

DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `category` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `price` int unsigned NOT NULL,
  `consist` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `photo` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `sale` tinyint unsigned DEFAULT NULL,
  `quantity` mediumint unsigned DEFAULT NULL,
  `popularity` int DEFAULT NULL,
  `rating` decimal(2,1) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `goods` (`id`, `name`, `description`, `category`, `price`, `consist`, `photo`, `sale`, `quantity`, `popularity`, `rating`) VALUES
(1,	'На Вечеринку!',	'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',	'Латексные шары',	3699,	'6 латексных шаров металлик 30 см \"Ассорти\"  4 латексных прозрачных шара 30 см с разноцветным конфетти',	'https://ir.ozone.ru/s3/multimedia-p/wc1000/6015837217.jpg',	7,	3,	1,	NULL),
(2,	'На День Рождения бирюзовый',	'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',	'Фольгированные шары',	3799,	'1 фольгированная цифра  на Ваш выбор 2 фольгированных звезды 46 см бирюзового и розового цвета',	'http://arkidutti.ru/image/cache/catalog/product/mimodutti-heart-mint2-600x600.jpg',	NULL,	0,	0,	NULL),
(3,	'Розовое золото',	'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',	'Латексные шары',	3299,	'4 латексных шара Розовое золото металлик 30 см 4 латексных прозрачных шара 30 см с конфетти розовое золото 3 латексных шара белый металлик 30 см',	'https://cdn1.ozone.ru/s3/multimedia-k/6125244884.jpg',	7,	2,	NULL,	NULL),
(4,	'Пламенное сердце',	'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',	'Латексные шары',	2999,	'9 латексных красных сердец 30 см',	'https://shariki-v-butovo.ru/image/cache/catalog/shariki-pod-potolok/shar-lateks-serdce-krasnoe-700x700.jpg',	7,	NULL,	3,	NULL),
(5,	'Мужчине',	'Шары в наборе связаны лентой другого цвета, и упакованы в прозрачный пакет. Вы можете распустить их под потолок или привязать композицию к предметам интерьера. ',	'Латексные шары',	2999,	'3 латексных камуфляжных шара 30 см 3 латексных прозрачных шара 30 см с золотым конфетти',	'http://i-am-balloon.by/image/cache/catalog/logos/475-1500x1500.jpg',	7,	4,	NULL,	NULL),
(6,	'Шар цифра напольная ',	'Высота 81см. Наполняется воздухом',	'Цифры',	3550,	'10 шаров цифр',	'https://zatey.ru/upload/iblock/7e0/u8vxtl3y5d7uaqkkhhepp6w7mhfjazlj/tsifry_i_chisla_shar_tsifra_9_66sm_blue_1207_3686.jpg',	8,	5,	NULL,	NULL),
(7,	'Шар 3D ЗВЕЗДА 64см Составная Light Pink',	'Объемная фольгированная звезда нежно розового цвета. Комплект содержит 13 элементов (конусов). Каждый элемент имеет встроенный клапан и надувается воздухом. ',	'3D Сферы',	500,	'Надутые элементы (12 штук) необходимо попарно связать между собой за хвосты и затем соединить пары друг с другом таким образом, чтобы получилась звезда. В комплект добавлен запасной, 13й элемент.',	'https://zatey.ru/upload/resize_cache/webp/iblock/478/kfs2e3l6r4eal7afjlvstqnhx2kmgsht/rozovaya_shar_3d_zvezda_64sm_sostavnaya_light_pink_1209_0439.webp',	NULL,	5,	1,	NULL),
(8,	'Шары Сердце 30см хром ассорти В.Затея',	'Шары в форме объемных сердец зеркально-блестящих оттенков (хром).',	'Хромовые шары',	562,	'Цвета: серебро, золото, розовый, розовое золото, синий, зеленый.',	'https://zatey.ru/upload/resize_cache/webp/iblock/3a3/dsf3kyodw3m7h3ofdt1uv2lrpvs2beoa/goryachie_serdtsa_shary_serdtse_30sm_khrom_assorti_v_zateya_1105_0440.webp',	5,	5,	NULL,	NULL),
(9,	'Шары под потолок. Изумруд и Золото №2',	'  В Ассорти входит:  Шары Double staff изумруд.  Хром золото.  Прозрачные с золотыми конфетти',	'Хромовые шары',	154,	'',	'https://xn--80afdbdniqzql.xn--p1ai/d/img-20190125-wa0084.jpg',	NULL,	5,	NULL,	NULL),
(10,	'Коробка сюрприз №5',	'Композиция 10шаров.',	'Фольгированные шары',	3905,	'Большая коробка 70х70х70 см с нанесенными поздравительными надписями',	'https://xn--80afdbdniqzql.xn--p1ai/d/korobka-sjurpriz-s-vozdushnymi-sharami-23-768x949jpg.webp',	5,	5,	0,	NULL),
(11,	'Коробка сюрпиз №7 с 2-я вашими индивидуальными надписями',	'Ходячая Фигура Бэтмен 112см.  Коробка70х70см.  Индивидуальная надпись на коробку 1шт.  Шар Сфера 3D, Deco Bubble Серебро 50см 1шт.  ',	'3D Сферы',	7900,	'Индивидуальная надпись на шар Bubble 1шт.  Фольгированные сердца 48см 7шт.',	'https://xn--80afdbdniqzql.xn--p1ai/d/korobka-sjurpriz-s-vozdushnymi-sharami-31.jpg',	15,	5,	NULL,	NULL),
(12,	'Щенячий патруль, два фонтана с большим шаром',	'Ходячая фигура Щенячий патруль 91см, 1шт. Большой шар Bubble 50см черный, 1шт. Надпись на Bubble любая на Ваш вкус. Фольгированные звезды 48см, 2шт. Шары зеркальный блеск 30см, 6шт',	'3D Сферы',	6915,	'Цвет шаров в композиции можно поменять на свой вкус.  Просто сообщите менеджеру при подтверждении заказа о ваших пожеланиях.',	'https://xn--80afdbdniqzql.xn--p1ai/d/shariki_shchenyachij_patrul.jpg',	NULL,	5,	NULL,	NULL),
(13,	'Звезды Ассорти',	'Звезды 52см. 5шт.  Латексные пастель 10шт.  Грузик 1шт.',	'Хромовые шары',	2420,	'15 шаров',	'https://xn--80afdbdniqzql.xn--p1ai/d/oblakoraznocvetnyhsharikov.jpg',	NULL,	5,	NULL,	NULL),
(14,	'Хром ассорти с синей цифрой 2 фонтана',	'25 шаров',	'Цифры',	4400,	'Цифра 1шт.  Хром 24шт.  Грузики 3шт.',	'https://xn--80afdbdniqzql.xn--p1ai/d/2019-10-09-09-11-15.jpg',	10,	5,	3,	NULL),
(15,	'Хром ассорти с цифрой 2фонтана',	'',	'Цифры',	3520,	'Цифра 102см. 1шт.  Шары Хром 30см. 20шт.  Грузики 3шт.',	'https://xn--80afdbdniqzql.xn--p1ai/d/nabor-chrome2.jpg',	NULL,	5,	NULL,	NULL),
(16,	'Цифра и два фонтана',	'25 шаров.',	'Цифры',	3435,	'Цифра 1шт.  Сердца и звезды 4шт.  Прозрачный с конфетти 4 шт.  Пастельные шары 10шт.  Шары метал 6шт.  Грузики 3шт.',	'https://xn--80afdbdniqzql.xn--p1ai/d/2019-10-09-09-03-55.png',	15,	5,	1,	NULL),
(17,	'Нежно розовая композиция',	'15 шаров',	'Фольгированные шары',	2365,	'Сердца и звезды 3шт.  Прозрачные с конфетти 3шт.  Латексные металл 4шт.  Латексные перламутр 5шт.  Грузик 1шт.',	'https://xn--80afdbdniqzql.xn--p1ai/d/2019-10-08-17-10-28-2.jpg',	10,	5,	0,	NULL),
(18,	'Огни большого города Шар Bubble 60см',	'15 шаров',	'Хромовые шары',	3410,	'Индивидуальная надпись на Bubble  1шт.  Шар Bubble 60 см. 1 шт.  Хром Ассорти 14 шт.  Голографический груз 3шт.',	'https://xn--80afdbdniqzql.xn--p1ai/d/img_5751.jpg',	2,	5,	NULL,	NULL),
(19,	'Композиция синяя для Него',	'15 шаров',	'Фольгированные шары',	2959,	'Звезды и круги 5шт.  Прозрачные с конфетти 4шт.  Шары металл 3шт.  Шары кристалл 3шт.  Грузик голографический 1шт.',	'https://xn--80afdbdniqzql.xn--p1ai/d/img_2129.jpg',	5,	5,	NULL,	NULL),
(20,	'Фигура фольга \"Мишка с сердечком\"',	'Размер: 91 см',	'Фольгированные шары',	950,	'',	'https://shariki.ru/files/products/mishka_3.602x655.jpg?b7e4216ce1c74151f310dbfb40df6e5b',	10,	5,	NULL,	NULL),
(21,	'Фонтан из шаров \"Узор сердец\"',	'Размер: 14\'\'/36 см',	'Хромовые шары',	1590,	'',	'https://shariki.ru/files/products/fontan.522x566.jpg?f038f4e4d779482e078da775410ebdaa',	5,	5,	NULL,	NULL),
(22,	'Цветы из шаров \"Розовые мечты\"',	'Размер: 70h',	'3D Сферы',	1500,	'',	'https://shariki.ru/files/products/akerapra.602x655.jpg?0e8adab6d9fb7d96529600a3666dd7bf',	NULL,	5,	NULL,	NULL),
(23,	'Композиция \"Агатовый рассвет\"',	'Размер: 14\'\'/36 см',	'Латексные шары',	5000,	'',	'https://shariki.ru/files/products/img-20181013-wa0010.522x566.jpg?8f2750cd40aceb35ff8f5ff986f22788',	NULL,	5,	NULL,	NULL),
(24,	'Цифра нежная радуга \"0\"',	'Размер: 102 см',	'Цифры',	1200,	'',	'https://shariki.ru/files/products/0_3.602x655.jpg?55eb97577eab22e88558eec0534882fd',	NULL,	5,	NULL,	NULL),
(25,	'Цифры \"25 девичьи радости\"',	'Размер: 102 см',	'Цифры',	2500,	'',	'https://shariki.ru/files/products/devichi-radosti.602x655.jpg?4d6a044ff13cb55493024e863b4c5f17',	5,	5,	NULL,	NULL),
(26,	'Фигура фольга \"Скай,щенячий патруль\"',	'Размер: 81 см',	'3D Сферы',	900,	'',	'https://shariki.ru/files/products/skaj-81sm.602x655.jpg?60194ec0bb03f1458c6ba65ae488f265',	10,	5,	NULL,	NULL),
(27,	'Фигура фольга \"Кошка голова,black\"',	'Размер: 48 см',	'3D Сферы',	500,	'',	'https://shariki.ru/files/products/golova-chernaya.602x655.jpg?8e396e8de770b7fc1425f0f6d401d531',	2,	5,	NULL,	NULL);

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `good` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `orders` (`id`, `name`, `good`) VALUES
(9,	'1',	'2'),
(10,	'1',	'10');

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `review` varchar(600) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `reviews` (`id`, `username`, `review`) VALUES
(1,	'Гость',	'Лучшие шары ever!!!!!!!\n'),
(2,	'Гость',	'Всё круто )');

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `pass` char(60) NOT NULL,
  `verified` enum('N','Y') NOT NULL DEFAULT 'N',
  `created_at` timestamp NOT NULL,
  `confirmation_token` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`idusers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `users` (`idusers`, `email`, `pass`, `verified`, `created_at`, `confirmation_token`) VALUES
(1,	'test111@ya.ru',	'$2y$12$Ax.CCAHzDJVOkX/nc8FbtOQCYQVpRALZb0lummX60y7jhkcCBtC76',	'Y',	'2023-02-24 09:27:40',	'b0716dc0a1fcee4d80b5e60e68a327493db35676b6259cec2ce62131b0d43b54afeb2d14344b9506'),
(2,	'kalina123456789@inbox.ru',	'$2y$12$8T2Sx8RlzqGZZVHNxxCWiOHsWv93uHtpnOA4eyP1cvOhXsE0dQM8W',	'Y',	'2023-02-26 18:38:48',	'9ec542dffa86e73c8f927f6db0b5a1dc39975b2aacb3fb5b93a1f17a8fcfd99c5d41d4a3c3d73c26');

-- 2023-03-05 22:00:59