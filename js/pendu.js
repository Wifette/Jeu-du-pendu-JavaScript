//Initialisation des variables
var fin = true; //Contient un booléen qui indique si la partie est active
var nb_erreurs = 0; //Récupère le nombre d'erreurs
var nb_passe = 0; //Compte le nombre de mots passés
var tab_mots; //Tableau contenant les mots
var nb_mots = 0; //Compte le nombre de mots présents dans le tableau
var chaine_rangee = ""; //Stocke les mots déjà utilisés pour ne plus les proposer
var le_mot = ""; var lindication = ""; //Contient la paire mot à trouver et son indice
var mem_mot = ""; // Conserve la mémoire des lettres aprés encodage
var le_score = 10; //Stock le score
var lettres_ok ="ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //Varaibel qui permet de contenir les lettres autorisées
var la_touche =""; //Variable contenant la touche appuyée ou cliquée

//Affichage aléatoire d'un mot à partir d'une liste
recuperer();

function recuperer()
{
    tab_mots = mots_a_trouver().split('*');
    nb_mots = tab_mots.length;	
}
//Fonction appellée par l'évènement body pour récupérer les valeurs des touches clavier
//ou par onclick des boutons du clavier virtuel
function debuter()
{	//Si aucune partie en cours
    fin = false;
    chaine_rangee= '';
    nb_passe = 0; nb_erreurs = 0; le_score = 10;
    suivant();
    //Si touche espace sortie de fonction
    if(la_touche==' ')
    return;
    //Partie activée par click sur le bouton
    //Changement de la valeur texte du bouton
    document.getElementById('partie').value = "Recommencer la partie"
}
//Fonction pour réinitialiser les boutons qui était désactivés
function init_calques()
{
    var parent = document.getElementById('apercu');
    var enfants = parent.getElementsByTagName('button');
    
    for (var i = 0; i < enfants.length; i++)
    {
        if(enfants[i].id != 'saut1' && enfants[i].id !='saut2')
        enfants[i].style.backgroundColor = 'powderblue';
        enfants[i].disabled=false;
    }
}

function suivant()
{
    var tab_enigme;
    var nb_alea = Math.floor(Math.random() * nb_mots);
    le_score = le_score-nb_erreurs/4;
    document.getElementById('leScore').innerHTML = 'Votre score :<strong>' + le_score + ' / 10</strong> - Mots restants :<strong>' + (10 - nb_passe) + '</strong>'
    document.getElementById('lePendu').src = 'img_pendu/pendu_defaut.png';
    nb_erreurs=0;
    init_calques();
    while(chaine_rangee.indexOf('-' + nb_alea + '-')>-1)
    {
        nb_alea = Math.floor(Math.random() * nb_mots);
    }
    chaine_rangee += '-' + nb_alea + '-';
    tab_enigme = tab_mots[nb_alea].split(':');
    le_mot = tab_enigme[0];
    lindication = tab_enigme[1];
    mem_mot = le_mot.toUpperCase();
    le_mot = le_mot.toUpperCase().replace(/[A-Z0-9]/g,'_');
    document.getElementById('indication').innerHTML = 'Indice :<br /><strong>' + lindication + '</strong>';
    document.getElementById('leMot').innerHTML = le_mot;
}
//Fonction qui récupère les touches boutons du clavier virtuel
function clavier_virtuel(touche){
    var indice=0;
    var la_lettre='';
    var trouve = false;
    
    //Si aucune partie initiée on sort de la fonction
    if(fin==true)
    //alert("Vous devez cliquer sur le bouton pour démarrer une partie")
    return;
    
    if(lettres_ok.indexOf(touche)==-1)
    return;
    
    document.getElementById(touche.toLowerCase()).style.backgroundColor = '#666666';
    document.getElementById(touche.toLowerCase()).disabled = true;
    
    for (indice=0; indice<=mem_mot.length-1; indice++)
    {
        la_lettre = mem_mot.substr(indice,1);
        if(la_lettre==touche)
        {
            trouve = true;
            le_mot = le_mot.substr(0,indice) + la_lettre + le_mot.substr(indice + 1);
            document.getElementById('leMot').innerHTML = le_mot;
        }
    }
    if(trouve == true)
    {
        if(le_mot == mem_mot)
        {
            nb_passe++;
            if(nb_passe==10)
            {
                document.getElementById('leScore').innerHTML = 'Votre score :<strong>' + (le_score-nb_erreurs/4) + ' / 10</strong> - Mots restants : <strong>' + (10 - nb_passe) + '</strong>- <strong>Victoire !</strong>';
                fin = true;
            }
            else
            {
                window.setTimeout(function attendre(){ suivant(); }, 1000);
            }
        }
    }
    else
    {
        nb_erreurs++;
        document.getElementById('lePendu').src = 'img_pendu/pendu' + nb_erreurs + '.png';
        if(nb_erreurs==4)
        {
            nb_passe++;
            if(nb_passe==10)
            fin = true
            //Affichage d'une fenêtre si perdu qui se referme automatiquement
            tempsFermeture = 3
            perdu= window.open('popup.html', "perdu")
            if (tempsFermeture) setTimeout("perdu.close();", tempsFermeture*1000);
            window.setTimeout(function attendre(){ suivant(); }, 1000);	
        }
    }
}
//Fonction récupération valeur touche clavier
function clavier(evenement)
{
    var indice=0;
    var la_lettre='';
    var trouve = false;
    
    if(fin==true)
    //alert("Vous devez cliquer sur le bouton pour démarrer une partie")
    return;
    
    var touche = window.event ? evenement.keyCode : evenement.which;
    touche = String.fromCharCode(touche).substr(0,1);
    
    
    if(touche==' ')
    {
        la_touche = ' ';
        return;
    }
    if(lettres_ok.indexOf(touche)==-1)
    return;
    
    document.getElementById(touche.toLowerCase()).style.backgroundColor = '#666666';
    document.getElementById(touche.toLowerCase()).disabled = true;
    
    for (indice=0; indice<=mem_mot.length-1; indice++)
    {
        la_lettre = mem_mot.substr(indice,1);
        if(la_lettre==touche)
        {
            trouve = true;
            le_mot = le_mot.substr(0,indice) + la_lettre + le_mot.substr(indice + 1);
            document.getElementById('leMot').innerHTML = le_mot;
        }
    }
    if(trouve == true)
    {
        if(le_mot == mem_mot)
        {
            nb_passe++;
            if(nb_passe==10)
            {
                document.getElementById('leScore').innerHTML = 'Votre score :<strong>' + (le_score-nb_erreurs/4) + ' / 10</strong> - Mots restants : <strong>' + (10 - nb_passe) + '</strong>- <strong>Victoire !</strong>';
                fin = true;
            }
            else
            {
                window.setTimeout(function attendre(){ suivant(); }, 1000);
            }
        }
    }
    else
    {
        nb_erreurs++;
        document.getElementById('lePendu').src = 'img_pendu/pendu' + nb_erreurs + '.png';
        if(nb_erreurs==4)
        {
            nb_passe++;
            if(nb_passe==10)
            fin = true
            tempsFermeture = 3
            perdu= window.open('popup.html', "perdu")
            if (tempsFermeture) setTimeout("perdu.close();", tempsFermeture*1000);
            window.setTimeout(function attendre(){ suivant(); }, 1000);
            
        }
    }
}


function perdu(URL, WIDTH, HEIGHT){
    var tempsFermeture = 2
    propFenetre = "left=50,top=50,width=500px,height=500px";
    perdu= window.open('popup.html', "perdu", propFenetre)
    if (tempsFermeture) setTimeout("perdu.close();", tempsFermeture*1000);
    console.log('tempsFermeture') 
}


            //générer un mot (tableau)
			
			//variable pendu = 0
			//pendu = 0
			//afficher le pendu
			
			//input lettre
			
			//var used = input lettre
			
			//afficher used
			
			//Condition vérification de la lettre used dans le mot 
			//si oui afficher la lettre dans chaque emplacement
			//Fin de boucle, vérification si mot complet
			//si oui message gagnant => rejouer ?
			//si non retour input lettre (function)
			//si non var pendu = var pendu + 1
			//si var pendu < 6 
			//si oui afficher le pendu retour input
			//si non message game over => rejouer ?