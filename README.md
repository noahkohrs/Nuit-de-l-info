# Nuit de l'info 2022 - Les Reblochons

Ce repo contient la partie frontend de notre projet 
ainsi qu'un Dockerfile permettant de l'afficher à l'aide de Nginx.

## Installation et utilisation du conteneur

Ce conteneur ne permet pas le développement en son sein, c'est juste un truc statique 
pour partager rapidement le front sans le back

Pour build l'image, la commande c'est `docker build . -t reblochons/front`

Pour la lancer, c'est `docker run -p 80:80 reblochons/front`,
le site sera accessible sur `http://localhost:80`.

Pour ce qui est du développement direct dans Docker, on verra au prochain commit ;)