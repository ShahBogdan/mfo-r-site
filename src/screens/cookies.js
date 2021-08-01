import React from 'react';
import {Container, Row} from "react-bootstrap";
import Footer from "../components/footer";
import {useTranslation} from 'react-i18next';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const ruText = "<div className=\"col-12\">\n" +
    "                  <p>\n" +
    "                        Файлы Cookies представляют собой файл с передаваемой информацией на сайте, и данный файл\n" +
    "                        хранится на устройстве пользователя. Содержание Cookies не позволяет идентифицировать\n" +
    "                        пользователя и соответственно не доступны другие файлы на устройстве пользователя. Cookies может\n" +
    "                        включать в себя наименование сайта, дату, время и т.д., ему присваивается уникальный номер, по\n" +
    "                        которому его распознает пользователь.</p>\n" +
    "                        <p >\n" +
    "                            Сохраненные cookies позволяют распознать компьютер клиента, таким образом клиенту,&nbsp; при\n" +
    "                            повторном посещении сайта или его раздела, предоставляется возможность избежать повторного\n" +
    "                            ввода данных. Сookies&nbsp; улучшает опыт пользователя&nbsp; на сайте и используется, чтобы\n" +
    "                            помочь развивать сайт и создать его более удобным для пользователей, чтобы помочь определить\n" +
    "                            и понять ожидания пользователей, а также показать определенные рекламные объявления на\n" +
    "                            различных сайтах соответствующей целевой аудитории, на основании предыдущих посещений\n" +
    "                            сайта.</p>\n" +
    "                        <p >\n" +
    "                            Пользователь услуги может в любое время внести изменения в настройках, в отношении\n" +
    "                            cookies.&nbsp; Данные настройки можно поменять, включить/блокировать автоматическую\n" +
    "                            обработку cookies.</p>\n" +
    "                        <p >\n" +
    "                            Больше информации о Cookies:</p>\n" +
    "                        <ul>\n" +
    "                            <li>\n" +
    "                                Cookies хранятся в вашем браузере, файлы временно хранятся в устройстве, устройство по\n" +
    "                                истечению соответствующего времени автоматически стирает их.\n" +
    "                            </li>\n" +
    "                            <li >\n" +
    "                                Cookies хранятся в вашем браузере, файлы временно хранятся в устройстве до момента,\n" +
    "                                когда пользователь их мануально удалит.\n" +
    "                            </li>\n" +
    "                            <li >\n" +
    "                                Аналитики Cookies и рекламные файлы с серверов объявлений, их компаний и поставщиков\n" +
    "                                услуг, данные файлы адаптируются к пользователю, его предпочтениям и привычкам. Данные\n" +
    "                                файлы позволяют оценить эффективность рекламы, например, вы можно узнать, как много\n" +
    "                                людей нажали на определенную рекламу и посетили сайт рекламодателя. Эти файлы cookies\n" +
    "                                собирают информацию и отправляют ее третьим лицам. Например, Google Ads, Google\n" +
    "                                Analytics, который хранит файлы cookies в течение 26 месяцев, а затем автоматически\n" +
    "                                удаляет их. Для получения дополнительной информации посетите сайты третьих лиц, получив\n" +
    "                                больше дополнительной информации об использовании файлов cookies.\n" +
    "                            </li>\n" +
    "                        </ul>\n" +
    "                        <p >\n" +
    "                            Информация о том, как посетители могут отказаться от Google используемых Cookies файлов, <a\n" +
    "                            href=\"https://adssettings.google.com/u/0/authenticated?hl=ru\" target=\"_blank\">рекламных\n" +
    "                            предпочтений</a> Google или отказаться от третьих сторон поставщиков\n" +
    "                            услуг,&nbsp; используемых Cookies&nbsp; файлы, <a\n" +
    "                            href=\"http://optout.networkadvertising.org/?c=1#!/\" target=\"_blank\">страница отказа\n" +
    "                            инициативной рекламной сети</a>.</p>\n" +
    "                        <p >\n" +
    "                            Cookies файлы на данном сайте можно легко принять или отклонить: <a href=\"javascript:;\"\n" +
    "                                                                                                onClick=\"confirm_cookies()\">согласен</a> / <a\n" +
    "                            href=\"https://www.aboutcookies.org/\" rel=\"nofollow\" target=\"_blank\">не согласен</a> с\n" +
    "                            использованием файлов cookies.</p>\n" +
    "                        <p >\n" +
    "                            <strong>Обратите внимание, что используемые файлы cookies, не могут нанести вред Вашему\n" +
    "                                устройству. Для лучшего опыта пользователей и полноценной&nbsp; деятельности сайта мы\n" +
    "                                рекомендуем сохранять файлы cookies, в таком случае есть возможность полноценно\n" +
    "                                использовать доступное содержание и персонализированные функции сайта.</strong></p>\n" +
    "\n" +
    "                    </div>";
const uaText = "<div class=\"col-12\">\n" +
    "\t\t\t\t\t<p style=\"text-align: justify;\">\n" +
    "\tФайли Cookies є файлом з інформацією, що передається на сайті, і такий файл зберігається на пристрої користувача. Зміст Cookies не дозволяє ідентифікувати користувача і відповідно не доступні інші файли на пристрої користувача. Cookies може включати в себе найменування сайту, дату, час і т.д., йому присвоюється унікальний номер, за яким його розпізнає користувач.</p>\n" +
    "<p style=\"text-align: justify;\">\n" +
    "\tЗбережені cookies дозволяють розпізнати комп'ютер клієнта, таким чином, клієнту, при повторному відвідуванні сайту або його розділу, надається можливість уникнути повторного введення даних. Сookies покращує досвід користувача на сайті і використовується, щоб допомогти розвивати сайт і створити його більш зручним для користувачів, щоб допомогти визначити і зрозуміти очікування користувачів, а також показати певні рекламні оголошення на різних сайтах відповідної цільової аудиторії, на підставі попередніх відвідувань сайту.</p>\n" +
    "<p style=\"text-align: justify;\">\n" +
    "\tКористувач послуги може в будь-який час внести зміни в налаштуваннях, щодо cookies. Дані налаштування можна змінити, включити / блокувати автоматичну обробку cookies.</p>\n" +
    "<p style=\"text-align: justify;\">\n" +
    "\tБільше інформації про Cookies:</p>\n" +
    "<ul>\n" +
    "\t<li style=\"text-align: justify;\">\n" +
    "\t\tCookies зберігаються у вашому браузері, файли тимчасово зберігаються в пристрої, пристрій по закінченню відповідного часу автоматично стирає їх.</li>\n" +
    "\t<li style=\"text-align: justify;\">\n" +
    "\t\tCookies зберігаються в вашому браузері, файли тимчасово зберігаються в пристрої до моменту, коли користувач їх мануально видалить.</li>\n" +
    "\t<li style=\"text-align: justify;\">\n" +
    "\t\tАналітики Cookies та рекламні файли з серверів оголошень, їх компаній і постачальників послуг, дані файли адаптуються до користувача, його перевагам і звичкам. Дані файли дозволяють оцінити ефективність реклами, наприклад, ви можна дізнатися, як багато людей натиснули на певну рекламу і відвідали сайт рекламодавця. Ці файли cookies збирають інформацію і відправляють її третім особам. Наприклад, Google Ads, Google Analytics, який зберігає файли cookies протягом 26 місяців, а потім автоматично видаляє їх. Для отримання додаткової інформації відвідайте сайти третіх осіб, отримавши більше додаткової інформації про використання файлів cookies.</li>\n" +
    "</ul>\n" +
    "<p style=\"text-align: justify;\">\n" +
    "\tІнформація про те, як відвідувачі можуть відмовитися від Google використовуваних Cookies файлів, <a href=\"https://adssettings.google.com/u/0/authenticated?hl=uk\" target=\"_blank\">рекламних переваг</a> Google або відмовитися від третіх сторін постачальників послуг, використовуваних Cookies файли, <a href=\"https://optout.networkadvertising.org/?c=1#!/\" target=\"_blank\">сторінка відмови ініціативної рекламної мережі</a>.</p>\n" +
    "<p style=\"text-align: justify;\">\n" +
    "\tCookies файли на даному сайті можна легко прийняти або відхилити: <a href=\"javascript:;\" onclick=\"confirm_cookies()\">згоден</a> / <a href=\"https://www.aboutcookies.org/\" target=\"_blank\">не згоден</a> з використанням файлів cookies.</p>\n" +
    "<p style=\"text-align: justify;\">\n" +
    "\t<strong><span style=\"text-align: justify;\">Зверніть увагу, що використовуються файли cookies, не можуть завдати шкоди Вашому пристрою. Для кращого досвіду користувачів і повноцінної діяльності сайту ми рекомендуємо зберігати файли cookies, в такому випадку є можливість повноцінно використовувати доступний зміст і персоналізовані функції сайту.</span></strong></p>\n" +
    "\n" +
    "\t\t\t\t\t</div>"
const Cookies = props => {
    const {t,i18n} = useTranslation();
    return (
        <>
            <Container>
                <p className='fs-3 mt-3 text-center fw-light'>Cookies</p>
            </Container>
            <Container className='bg-light p-4'>
                <Row>
                    {ReactHtmlParser(i18n.language === "ru" ? ruText : uaText)}
                </Row>
            </Container>
            <Footer/>
        </>

    );
};


export default Cookies;
