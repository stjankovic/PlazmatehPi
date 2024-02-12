<br>
<p align="center">
  <a href="" rel="noopener">
 <img height=30px src="https://www.plazmateh.rs/img/default/Logo1.png" alt="Project logo"></a>
</p>


---

<p align="center">  
    <B>Odma ti kazem posla koliko oces.... Ali ce ga napravimo za sve pare</B>
    <br>
    Resenje za PLC i HMI na Raspberry Pi sistemu
    <br> 
    
</p>

##

- [Opis](#Opis)
- [Status](#Status)
- [Prvo Pokretanje Windows 10/11](#startup)
- [Tehnologija](#built_using)
- [Autori](#authors)

##  Opis <a name = "Opis"></a>

Electron JS aplikacija za Windows i Debian Linux (Raspberry Pi)

Aplikacija radi na linux (Windows) sistemu.
Korisnik preko **Visual Studio Code** kompajluje instancu programa za testiranje na Windowsu.

Za pokretanje na Linux potrebno je da se [**electron-builder**](https://www.electron.build/index.html) da napravi permanentu instancu.


Glavni proces se pokrece iz main.js
Main.js povlaci sve potrebne fajlove za sistemske, hmi i plc funcionalnosti i generise glavni proces.
U data.json se nalaze parametri koji ce biti promenljivi. 
Poslednji unos iz data.json ce se prikazati kao trenutni na ekranu i koristiti kao i varijable.

Ideja je da se napravi plc.js dokument gde ce korisnik moci da pise program 

**Aplikacija je u izradi...**

Primer kako bi program izgledao za kontrolnu stranu:

```javascript
var Gpio = require('onoff').Gpio; //biblioteka za IO
var LED = new Gpio(4, 'out'); //PIN 4 Output
var pushButton = new Gpio(17, 'in', 'both'); //pin 17 input

//funckija 
pushButton.watch(function (err, value) { // ako se dugme stisne
  if (err) { //if an error
    console.error('There was an error', err); //poruka u konzoli
  return;
  }
  LED.writeSync(value); //postavka za ilaz
});

//funkcija kad se gasi program
function unexportOnClose() { 
  LED.writeSync(0); // Ugasi LED
  LED.unexport(); // Oslobodi Pin
  pushButton.unexport(); // Oslobodi Pin
};

process.on('SIGINT', unexportOnClose); //Funkcija kad se program ugasi
```

## Status <a name = "Status"></a>

Prikaz u kom statusu su funkcionalnosti aplikacije.

- <b>HMI funkcionalnost:</b>
  - 0&nbsp;&nbsp;  % - Alarms
  - 60 % - Devices
      - Design 100%
      - Function 20%
  - 75 % - License
      - Design 100%
      - Function 50%
  - 0&nbsp;&nbsp;  % - Limits
  - 80 % - Machine
    -  0 %  - Grafici
    -  30%  - Button
    -  30%  - Toggle
    -  30%  - Input Field
    -  30%  - Indication
  - 0&nbsp;&nbsp; % - Network
  - 10 % - Parameters
  - 0&nbsp;&nbsp;  % - Recipes
  - 5&nbsp;&nbsp;  % - Settings
    
- <b>PLC funkcionalnost:</b>
  - <span style="color:green;">100  % - Raspberry Pi IO instalacija (test okruzenje - Hyper V)</span>
  - 0&nbsp;&nbsp;&nbsp;&nbsp;  % - Raspberry Pi IO instalacija (Raspberry okruzenje)
  - 0&nbsp;&nbsp;&nbsp;&nbsp;  % - Digitalni izlazi/ulazi
  - 0&nbsp;&nbsp;&nbsp;&nbsp;  % - Analogni izlazi/ulazi (potreban ext module)
  - 0&nbsp;&nbsp;&nbsp;&nbsp;  % - USB Komunikacija
  - 0&nbsp;&nbsp;&nbsp;&nbsp;  % - UART Komunikacija
  - 0&nbsp;&nbsp;&nbsp;&nbsp;  % - SPI Komunikacija
  - 0&nbsp;&nbsp;&nbsp;&nbsp;  % - I2C Komunikacija
- <b>Sistemske funkcionalnosti:</b>
  - HMI
    - 90% - Dinamicki prikaz podataka 
    - 0% - Mogucnost da korisnik upravlja podacima
    - 50% - License, korisnik da moze definisati sa administrator nalogom trajanje license
      - :ok: - Automatsko prosledjivanje korisnika na stranice u slucaju isteka ili trajanje license
      - 0%   - Unos nove license korosnika
    - 0% - Settings, sistemska podesavanja, jezik ...
   - PLC
    - 0% - Postavke za olaksano i izolovano pisanje programa bez interakcija sa sistemskim okruzenjem   
    - 0% - Postavke za protokolske komunikacije I2C, SPI itd...   
    - 0% - Postavke za protokolske komunikacije I2C, SPI itd...   
##  Postavljanje Windows 10/11 <a name = "startup"></a>

Za postavljanje radnom okruzenja potrebno je instalirati nekoliko programa. (Instalacije na linku)

- [Node.js](https://nodejs.org/dist/v20.11.0/node-v20.11.0-x64.msi) - Compiler za aplikaciju
- [Visual Studio Code](https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user) - Radno okruzenje
- [Git](https://github.com/git-for-windows/git/releases/download/v2.43.0.windows.1/Git-2.43.0-64-bit.exe) - Github za cuvanje koda i zajednicko istovremeno programiranje

### Pokretanje prvi put na Windows 10/11

Nakon instalacije programa, restartovati racunar (obavezno).

Na D: particiji napraviti novi folder i izvrsiti komandu
```console
git clone https://github.com/stjankovic/PlazmatehPi.git
```

Napravice se novi folder PlazmatehPi
```console
cd PlazmatehPi
dir PlazmatehPi
```
Bice prikazani ovi podaci:
```
.gitignore
data.json
img
08main.js
node_modules
package-lock.json
package.json
pages
preload.js
README.md
cripts
styles.css
usbUtils.js
```
Otvoricemo radno okruzenje Visual Studio Code komandom
```console
code .
```
Mozemo zatvori trenutni CMD prozor posto u Visual Studio Code vec postoji integrisani **Terminal** na dnu.

U terminalu kucamo komandu za instalacije svih potrebnih bibloteka:

Npm ce sam prepoznati po **package.json** koje biblioteke su potrebne i kakva instalacija se izvrsava.
```console
npm install
```

Instalacija treje minut-dva...

Aplikacija je spremna za pokretanje .
```console
npm run start
```

Na glavnom ekranu trebala bi se otvoriti aplikacija. Aplikacija je privremeno instancirana za razvoj.
Trenutno su samo najosnovnije konfiguracije.

 Zovi kad treba pomoc :)

Kad uspes da instaliras na Windowsu i steknes osecaj gde se sta nalazi, onda mozemo jako slicnu proceduru na Linuxu da pokrene na Raspberriju.

Pisacu dalje ovo upustvo ovde i slacu ti obavestenja kad je sta gotovo da probas.

Kad oces novu verziju koda da povuces u cmdu kucas komandu kad si u fodler PlazmatehPi
```console
git pull origin master
```
Ako iz nekog razloga nece da funcionise **git pull** onda vrati se i pocni proceduru iz pocetka...



##  Tehnologija <a name = "built_using"></a>

- [NodeJS]() - NodeJS
- [On/Off]() - Raspberry Pi
- [ElectronJS]() - Aplikacija
- [CSV]() - Database

##  Autori <a name = "authors"></a>
- [Branimir Plazinic](https://www.plazmateh.rs/)
- [Stefan Jankovic](https://github.com/stjankovic)

See also the list of [contributors](https://github.com/kylelobo/The-Documentation-Compendium/contributors) who participated in this project.

