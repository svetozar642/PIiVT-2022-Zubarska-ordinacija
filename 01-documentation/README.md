# Aplikacija za vodjenje zubarske ordinacije

Ovo je projekat za ispit iz predmeta Praktikum - Internet i Veb tehnologije

Ime i prezime : Svetozar Stanković

Broj indeksa : 2018203764

Školska godina : 2021/2022

### Kao glavni word fajl za dokumentaciju koristiti " DOKUMENTACIJA (GLAVNA) Veb aplikacija za zubarsku ordinaciju.docx " .

Ukoliko zelite da pogledate uvelicano Use-Case dijagrame , ER dijagrame i dijagrame aktivnosti,
mozete ih otvoriti u obliku power point prezentacije pod nazivom " Analiza zahteva - Use case dijagram , Dijagram aktivnosti, ER dijagram.pptx "

Takođe imate i dostupan popis svih tabela i polja baze podataka i u odvojenom word dokumentu pod nazivom "Model baze podataka i popis tabela sa njihovim atributima.docx"

Takođe u okviru foldera 01-documentation se nalazi folder "Figma prototip" gde se nalazi dizajn prototipa aplikacije u PDF obliku i kao sačuvana lokalni fajl figme,
ali imate i dostupan link koji vodi direktno na Figma ...


U okviru foldera " 02-resources " se nalazi folder " Postman test API " u okviru koga se nalazi exportovana Postman kolekcija sa testiranim svim rutama back-end dela aplikacije . 

U folderu " 02-resources " se nalazi dump baze podataka aplikacije.

# Napomena:

Pre nego sto pokrenete FRONT-END deo morate da oslobodite pristup svim rutama API-ja bez auth tokena jer nije implementirana logika za rad sa njima na FRONT delu,
da bi komponenete KorisnikPacijenti i KorisnikUsluge mogle da izlistaju sve pacijente ili usluge iz baze.

Oslobadjanje ruta se vrsi tako sto odete u folder 03-back-end/src i u okviru fajla configs.ts promenite parametar "allowAllRoutesWithoutAuthTokens: false" na "true" vrednost.
## Ja sam postavio da podrazumevano ovaj parametar (allowAllRoutesWithoutAuthTokens: false) bude "false" i da za pristup rutama API trazi auth token ...
