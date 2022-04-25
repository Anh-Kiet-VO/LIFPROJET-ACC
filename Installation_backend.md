# LIFPROJET-ACC

## Installation base de donnée :
Installer [XAMPP](https://www.apachefriends.org/fr/index.html) pour avoir une base de donnée en localhost
Démarrer Apache et MySQL

---

La base de donnée sera accessible via localhost/phpymadmin
Démarrez ``Apache`` et ``MySQL``
![Image XAMPP](https://cdn.discordapp.com/attachments/715537719287087117/959807860987011152/unknown.png)

Après démarrage de la BDD installez le [script](https://github.com/Anh-Kiet-VO/LIFPROJET-ACC/blob/master/lifprojet.sql)

---

Puis importez le script dans votre phpmyadmin 

![Image PhpMyAdmin](https://cdn.discordapp.com/attachments/680775708997451791/968081555463479296/unknown.png)

---
## Démarrer notre API :
```
cd server
npm install
npm run start
```

---

## Problème rencontré :
Si vous avez une erreur avec my sql, dans le dossier ``server`` executez  la commande suivante :
```
npm install mysql --save
```
