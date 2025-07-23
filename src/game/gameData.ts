interface GameTextType {
  text: string;
  style: {};
  padding: number;
  textureName: string;
  backgroundColor: number;
  backgroundOpacity: number;
}

export const plot: GameTextType = {
  text: `Kde bolo tam bolo, medzi Zoborom a Mochovcami, neďaleko Jancsi pataku žili traja kamarati. Neboli to však bežní chalani, akých stretnete na ulici. Boli to obávaní banditi, na akých si už nepamätajú ani najstarší.\n
Podozriví z vrážd a krádeží, niesli v sebe tajomstvo, ktoré strpčovalo ich vzťah s okolitým svetom. Keď slnko zájde za horizont a celé podzoborie zahalí tichá tma, až vtedy je každému jasné, že to nebudú návštevníci z tohto sveta.\n
Až jedného dňa všetko vyšlo najavo a zašal sa neľútostný boj medzi svetom v ktorom žijeme a svetom odkial prišli títo chladnokrvní kati.\n
Si medzi poslednými, ktorí prežili a zodpovednosť za záchranu tvojej rodnej dediny padá na Tvoje plecia! Jediná zbraň, ktorú si dokázal zohnať je susedova Beretta s niekoľko nábojmi. Tvojou úlohou je pozbierať odvahu a zlikvidovať všetkých nepriateľov!\n
Tak do toho, je to na Tebe!`,
  style: {
    fontFamily: "Arial",
    fontSize: 20,
    color: "#000",
  },
  padding: 20,
  textureName: "about-text-bg",
  backgroundColor: 0xdccd24, // Yellow background color
  backgroundOpacity: 0.8, // Opacity for the background
};
export const copyrightText = "© 2025 Ugarak Shooter v2.0 (Remastered)";
export const copyrightTextStyle = {
  fontFamily: "Arial Black",
  fontSize: 15,
  color: "#fff",
  stroke: "#000",
  strokeThickness: 8,
};
export const controlsHint: GameTextType = {
  text: "Ako na to?\nStrielať môžes pomocou ľavého tlačidla myši. Keď dôjdu náboje, môžeš prebiť zbraň pomocou medzerníka.",
  style: {
    fontFamily: "Arial",
    fontSize: 20,
    color: "#000",
  },
  padding: 20,
  textureName: "controls-text-bg",
  backgroundColor: 0xdccd24, // Yellow background color
  backgroundOpacity: 0.8, // Opacity for the background
};

export const demonImages = ["demon1", "demon2", "demon3"];
export const tweenEases = [
  "Linear",
  "Sine",
  "Quad",
  "Cubic",
  "Quart",
  "Quint",
  "Expo",
  "Circ",
  "Back",
  "Elastic",
  "Bounce",
];
export const crosshairCursor =
  "url(src/assets/images/cursor2v2.png), crosshair";
export const gunSounds = ["shot", "emptygun", "reload"];
export const demonSounds = [
  "headshot1",
  "headshot2",
  "headshot3",
  "headshot4",
  "headshot5",
];
