const searchInput = document.querySelector("#bookSearch");
let bookCards = [...document.querySelectorAll(".book-card")];
const filterButtons = [...document.querySelectorAll(".filter-chip")];
const noResults = document.querySelector("#noResults");
const bookDialog = document.querySelector("#bookDialog");
const dialogContent = document.querySelector("#dialogContent");
const newsletterForm = document.querySelector("#newsletterForm");
const newsletterMessage = document.querySelector("#newsletterMessage");
const catalogCount = document.querySelector("#catalogCount");
const bookGrid = document.querySelector("#bookGrid");

const additionalWorks = [
    { title: "Monnè, outrages et défis", author: "Ahmadou Kourouma", kind: "roman", synopsis: "À travers plusieurs générations d’un royaume malinké, le roman met en scène la pénétration coloniale, les malentendus entre pouvoirs et les transformations imposées à la société.", themes: ["Colonisation", "Pouvoir", "Mémoire"], angle: "Le mot « monnè » renvoie à l’idée d’outrage et de défi. Observez comment le récit fait de l’incompréhension entre les autorités un moteur historique et comique." },
    { title: "En attendant le vote des bêtes sauvages", author: "Ahmadou Kourouma", kind: "roman", synopsis: "Sous la forme d’un donsomana, récit de louange et de chasse, un griot retrace l’ascension et le règne du dictateur Koyaga, en mêlant parole rituelle, satire et histoire politique.", themes: ["Dictature", "Satire", "Oralité"], angle: "La structure de l’épopée détourne les codes de la louange : demandez-vous comment la parole du griot peut à la fois célébrer et démasquer le pouvoir." },
    { title: "Quand on refuse on dit non", author: "Ahmadou Kourouma", kind: "roman", synopsis: "Birahima, revenu des guerres du Liberia et de Sierra Leone, découvre une Côte d’Ivoire traversée par les tensions politiques. Son regard d’ancien enfant-soldat donne au récit une voix décalée et inquiète.", themes: ["Identité", "Conflit", "Citoyenneté"], angle: "Le parcours de Birahima relie les conflits régionaux aux fractures ivoiriennes. Analysez le rôle de son langage direct dans la critique des discours identitaires." },
    { title: "Un Nègre à Paris", author: "Bernard Binlin Dadié", kind: "autres", synopsis: "Dans ce récit de voyage, un narrateur africain découvre Paris et observe ses rues, ses habitudes et ses institutions avec curiosité, humour et distance.", themes: ["Voyage", "Regard", "Rencontre des cultures"], angle: "Le déplacement inverse le regard habituel : la ville européenne devient un objet d’observation. Repérez les procédés d’ironie et les comparaisons culturelles." },
    { title: "Le Pagne noir", author: "Bernard Binlin Dadié", kind: "autres", synopsis: "Ce recueil de contes puise dans des récits et imaginaires africains pour mettre en scène des épreuves, des liens familiaux, des animaux et des leçons de vie.", themes: ["Conte", "Transmission", "Sagesse"], angle: "Étudiez les motifs récurrents du conte : épreuve, répétition, intervention du merveilleux et portée de la parole finale." },
    { title: "Légendes africaines", author: "Bernard Binlin Dadié", kind: "autres", synopsis: "Dadié rassemble et réécrit des récits légendaires qui éclairent des origines, des valeurs collectives et des représentations du monde.", themes: ["Légende", "Origines", "Mémoire collective"], angle: "Distinguez la matière de tradition orale et le travail de mise en forme littéraire : choix du narrateur, rythme et adresse au lecteur." },
    { title: "La Ronde des jours", author: "Bernard Binlin Dadié", kind: "poesie", synopsis: "Un recueil poétique où la vie quotidienne, la nature, les sentiments et l’expérience africaine deviennent matière à célébrer et à méditer.", themes: ["Temps", "Nature", "Vie quotidienne"], angle: "Observez comment les images du jour et du cycle donnent une forme poétique au passage du temps et à l’attention portée au monde." },
    { title: "Afrique debout !", author: "Bernard Binlin Dadié", kind: "poesie", synopsis: "La parole poétique se fait appel à la dignité et au réveil collectif, dans un contexte marqué par la domination coloniale et les aspirations à l’émancipation.", themes: ["Dignité", "Liberté", "Engagement"], angle: "Repérez les marques de l’adresse collective, les impératifs et les images de relèvement qui donnent au poème sa force oratoire." },
    { title: "Monsieur Thôgô-Gnini", author: "Bernard Binlin Dadié", kind: "theatre", synopsis: "Cette comédie met en scène un notable et les mécanismes d’une société où l’argent, le prestige et les rapports de pouvoir se donnent en spectacle.", themes: ["Argent", "Pouvoir", "Satire sociale"], angle: "La comédie permet de faire apparaître les contradictions des personnages. Étudiez les effets du dialogue, du comique et de la caricature." },
    { title: "Béatrice du Congo", author: "Bernard Binlin Dadié", kind: "theatre", synopsis: "La pièce revient sur la figure historique de Kimpa Vita, dite Béatrice du Congo, et sur son affrontement avec les pouvoirs religieux et politiques de son époque.", themes: ["Histoire", "Croyance", "Résistance"], angle: "La pièce dramatise la rencontre entre pouvoir, religion et résistance. Comparez le personnage historique et sa construction théâtrale." },
    { title: "Îles de tempête", author: "Bernard Binlin Dadié", kind: "theatre", synopsis: "Une œuvre dramatique qui inscrit les conflits et les bouleversements historiques dans des destins individuels, entre domination et désir de liberté.", themes: ["Histoire", "Conflit", "Liberté"], angle: "Le titre suggère des espaces exposés aux forces contraires. Examinez comment le conflit collectif se traduit dans les scènes et les choix des personnages." },
    { title: "Assémien Déhylé, roi du Sanwi", author: "Bernard Binlin Dadié", kind: "theatre", synopsis: "Cette pièce s’inspire d’une figure royale du Sanwi pour interroger l’autorité, la mémoire politique et les rapports avec la présence coloniale.", themes: ["Royauté", "Mémoire", "Colonisation"], angle: "La scène transforme une figure du passé en questionnement sur la légitimité. Portez attention aux symboles de pouvoir et à la représentation de l’histoire." },
    { title: "À vol d’oiseau", author: "Véronique Tadjo", kind: "poesie", synopsis: "Un recueil de poésie où le regard se déplace, saisissant des paysages, des sensations et des fragments d’expérience avec mobilité et attention.", themes: ["Regard", "Voyage", "Nature"], angle: "Le titre invite à penser la distance et la liberté du regard. Étudiez les images de mouvement et la manière dont les poèmes cadrent le monde." },
    { title: "Champs de bataille et d’amour", author: "Véronique Tadjo", kind: "poesie", synopsis: "Le recueil fait dialoguer l’intime et les tensions collectives, en abordant l’amour, les blessures et la possibilité de tenir face aux conflits.", themes: ["Amour", "Violence", "Résilience"], angle: "Le rapprochement des mots « bataille » et « amour » construit une tension féconde entre destruction et lien. Observez comment les voix poétiques la travaillent." },
    { title: "Le Royaume aveugle", author: "Véronique Tadjo", kind: "roman", synopsis: "Dans un univers romanesque allégorique, le pouvoir et les certitudes d’une communauté sont mis à l’épreuve par l’aveuglement, la peur et la difficulté de voir autrement.", themes: ["Pouvoir", "Perception", "Responsabilité"], angle: "La cécité peut être lue comme une image politique et morale. Analysez ce que le récit rend visible ou maintient dans l’ombre." },
    { title: "L’Ombre d’Imana", author: "Véronique Tadjo", kind: "autres", synopsis: "Ce récit de voyage et de mémoire prend pour point de départ le Rwanda après le génocide de 1994 et cherche une forme juste pour témoigner, écouter et écrire.", themes: ["Mémoire", "Témoignage", "Écriture"], angle: "Le texte réfléchit aux limites de la position de témoin. Distinguez observation, parole recueillie et questionnement de l’écrivaine sur sa propre écriture." },
    { title: "Si j’étais roi", author: "Véronique Tadjo", kind: "autres", synopsis: "Un livre destiné à la jeunesse qui ouvre un espace de jeu et d’imagination autour de l’enfance, du pouvoir et de la possibilité de transformer le quotidien.", themes: ["Enfance", "Imagination", "Pouvoir"], angle: "La formule du titre place le lecteur dans une hypothèse. Observez comment l’imaginaire enfantin permet de questionner l’autorité." },
    { title: "Ayanda, la petite fille qui ne voulait pas grandir", author: "Véronique Tadjo", kind: "autres", synopsis: "Ayanda refuse de grandir après la perte de son père. Le récit accompagne son rapport au chagrin et le lent retour du désir de vivre.", themes: ["Deuil", "Enfance", "Résilience"], angle: "Le refus de grandir donne une forme visible au deuil. Suivez les étapes symboliques qui permettent à Ayanda de renouer avec le monde." },
    { title: "En compagnie des hommes", author: "Véronique Tadjo", kind: "roman", synopsis: "À partir de la crise d’Ebola en Afrique de l’Ouest, le roman fait entendre une pluralité de voix humaines et non humaines pour raconter l’épidémie et ses effets.", themes: ["Épidémie", "Solidarité", "Écologie"], angle: "La polyphonie décentre le récit : demandez-vous ce que changent les voix non humaines dans la représentation d’une crise sanitaire." },
    { title: "Une vie de crabe", author: "Tanella Boni", kind: "roman", synopsis: "Le roman suit une trajectoire féminine et sociale où les choix individuels se heurtent aux contraintes de l’environnement, aux attentes collectives et aux rapports de pouvoir.", themes: ["Condition féminine", "Société", "Liberté"], angle: "L’image du crabe peut suggérer des avancées obliques ou empêchées. Reliez les déplacements du personnage aux limites sociales qui les orientent." },
    { title: "Matins de couvre-feu", author: "Tanella Boni", kind: "roman", synopsis: "Dans une ville traversée par l’instabilité et les restrictions, des existences ordinaires révèlent les effets intimes de la peur et de la violence politique.", themes: ["Ville", "Violence politique", "Vie quotidienne"], angle: "Le couvre-feu modifie l’espace et le temps. Examinez comment les gestes quotidiens deviennent des indices de la situation politique." },
    { title: "Les Baigneurs du lac Rose", author: "Tanella Boni", kind: "roman", synopsis: "Le récit explore des destins et des relations dans un espace marqué par l’eau, les déplacements et les inégalités, en donnant place aux expériences individuelles.", themes: ["Corps", "Espace", "Inégalités"], angle: "Le lac et la baignade forment un cadre symbolique à interroger : qui peut occuper l’espace, et quels rapports sociaux s’y rendent visibles ?" },
    { title: "Chaque jour l’espérance", author: "Tanella Boni", kind: "poesie", synopsis: "Une poésie attentive à la fragilité de l’existence et à la persistance de l’espoir dans les gestes, les liens et les jours ordinaires.", themes: ["Espérance", "Temps", "Résistance"], angle: "Le titre associe la répétition quotidienne à une énergie morale. Repérez les images concrètes qui empêchent l’espérance de rester abstraite." },
    { title: "Toute d’épine vêtue", author: "Tanella Boni", kind: "poesie", synopsis: "Le recueil travaille une parole poétique où la vulnérabilité et la résistance se côtoient, notamment dans la représentation du corps et de la voix des femmes.", themes: ["Corps", "Voix féminine", "Résistance"], angle: "L’épine évoque simultanément blessure et protection. Étudiez les images qui construisent cette ambivalence." },
    { title: "De l’autre côté du soleil", author: "Tanella Boni", kind: "roman", synopsis: "Le roman met en jeu les frontières, les appartenances et les imaginaires du déplacement, en suivant des personnages confrontés à un ailleurs qui transforme leur regard.", themes: ["Déplacement", "Identité", "Ailleurs"], angle: "Le « côté » du titre suggère une frontière autant qu’une perspective. Repérez les changements de point de vue et leurs effets sur l’identité." },
    { title: "La Carte d’identité", author: "Jean-Marie Adiaffi", kind: "roman", synopsis: "N’Zué, dont l’identité est contestée par l’administration coloniale, entreprend de faire reconnaître son nom et son appartenance. Le document bureaucratique devient le lieu d’un affrontement symbolique.", themes: ["Identité", "Administration", "Colonisation"], angle: "La carte fonctionne comme un objet de pouvoir : elle prétend définir la personne. Analysez l’opposition entre identité vécue et identité administrée." },
    { title: "Silence, on développe", author: "Jean-Marie Adiaffi", kind: "roman", synopsis: "Le roman met en question le discours du développement et les promesses de modernisation, en confrontant slogans, réalités sociales et expériences des populations.", themes: ["Développement", "Pouvoir", "Discours"], angle: "Le titre détourne une formule d’autorité. Étudiez le décalage entre langage officiel et vécu, ainsi que les procédés satiriques du récit." },
    { title: "D’éclairs et de foudres", author: "Jean-Marie Adiaffi", kind: "poesie", synopsis: "Une parole poétique traversée par l’énergie de l’invective et de l’éveil, où les images électriques et orageuses accompagnent une exigence de liberté.", themes: ["Engagement", "Révolte", "Langage"], angle: "L’éclair et la foudre sont des images de rupture et de puissance. Observez leur rôle dans le rythme et la tonalité des poèmes." },
    { title: "Les Naufragés de l’intelligence", author: "Jean-Marie Adiaffi", kind: "roman", synopsis: "Le roman interroge les conséquences de choix politiques et sociaux qui désorientent les individus et les communautés, à travers une écriture critique des pouvoirs.", themes: ["Pouvoir", "Crise sociale", "Responsabilité"], angle: "Le naufrage est une métaphore à suivre : quels personnages ou idéaux sont mis en péril, et quelles responsabilités le récit désigne-t-il ?" },
    { title: "Le Paradis français", author: "Jean-Marie Adiaffi", kind: "roman", synopsis: "L’œuvre questionne l’image idéalisée de la France et les promesses d’assimilation, en mettant en lumière les désillusions et les rapports de domination hérités de la colonisation.", themes: ["Assimilation", "Colonisation", "Désillusion"], angle: "Interrogez l’ironie du titre et le décalage entre représentation rêvée et expérience historique." },
    { title: "Les Frasques d’Ebinto", author: "Amadou Koné", kind: "roman", synopsis: "Ebinto, jeune élève confronté à une grossesse inattendue et aux responsabilités qui en découlent, voit son avenir et ses ambitions bouleversés.", themes: ["Adolescence", "Responsabilité", "Éducation"], angle: "Le récit de formation bascule sous le poids d’une responsabilité précoce. Analysez le rôle du point de vue et la tension entre désir individuel et normes sociales." },
    { title: "La Mare aux crocodiles", author: "Amon d’Aby", kind: "theatre", synopsis: "Cette pièce mobilise l’image de la mare et des crocodiles pour mettre en scène des rapports de force, des rivalités et les dangers qui menacent une communauté.", themes: ["Pouvoir", "Communauté", "Allégorie"], angle: "L’espace scénique peut être lu comme une allégorie sociale. Observez comment le danger est incarné et comment les personnages réagissent collectivement." },
    { title: "Les Sofas", author: "Bernard Zadi Zaourou", kind: "theatre", synopsis: "La pièce revisite une mémoire de résistance et de lutte, en faisant du théâtre un lieu de transmission historique et de réflexion sur la liberté.", themes: ["Résistance", "Histoire", "Mémoire"], angle: "Étudiez la manière dont la scène transforme la mémoire historique en action présente : chœur, oralité et corps peuvent y jouer un rôle essentiel." },
    { title: "La Guerre des femmes", author: "Bernard Zadi Zaourou", kind: "theatre", synopsis: "La pièce place les femmes au cœur d’un conflit et interroge leur capacité d’action, leur solidarité et les rapports de domination qui structurent la communauté.", themes: ["Femmes", "Solidarité", "Pouvoir"], angle: "Le titre annonce un conflit mais ne suffit pas à en fixer le sens. Analysez les voix féminines et la façon dont la pièce met en scène leur autorité." },
    { title: "Le Fils-de-la-femme-mâle", author: "Maurice Bandaman", kind: "roman", synopsis: "Le roman déploie un univers où les identités, les rôles de genre et les rapports de pouvoir sont déplacés, dans une écriture faisant place au mythe et à l’imaginaire.", themes: ["Genre", "Mythe", "Identité"], angle: "Le titre met en crise les catégories attendues. Étudiez comment le récit utilise l’inversion et le merveilleux pour questionner l’ordre social." },
    { title: "La Bible et le fusil", author: "Maurice Bandaman", kind: "roman", synopsis: "L’œuvre confronte les discours religieux et la violence armée dans une réflexion sur la foi, le pouvoir et les contradictions de l’histoire contemporaine.", themes: ["Religion", "Violence", "Pouvoir"], angle: "Le rapprochement de la Bible et du fusil fait apparaître une tension entre parole de paix et force. Suivez cette opposition dans les situations et les symboles." },
    { title: "Les Catapilas, ces ingrats", author: "Venance Konan", kind: "roman", synopsis: "À travers une relation de voisinage entre un propriétaire et des habitants installés sur son terrain, le récit observe avec humour les conflits d’intérêts et les arrangements sociaux.", themes: ["Voisinage", "Propriété", "Humour social"], angle: "La narration humoristique rend visibles les intérêts qui s’affrontent. Repérez comment le regard du narrateur guide notre jugement sur les personnages." },
    { title: "Robert et les Catapilas", author: "Venance Konan", kind: "roman", synopsis: "Robert se retrouve au contact de personnages et de situations qui prolongent l’observation satirique des rapports sociaux et des manières de vivre ensemble.", themes: ["Société", "Satire", "Relations humaines"], angle: "Comparez la fonction du personnage de Robert avec celle des figures collectives : l’humour repose-t-il sur les individus ou sur les mécanismes sociaux ?" },
    { title: "Nègreries", author: "Venance Konan", kind: "autres", synopsis: "À travers des textes de réflexion et d’observation, l’auteur aborde des réalités africaines contemporaines avec une écriture critique et volontiers ironique.", themes: ["Identité", "Société", "Satire"], angle: "La forme de chronique invite à distinguer observation, argument et ironie. Interrogez les généralisations et le point de vue de l’auteur." },
    { title: "Rebelle", author: "Fatou Keïta", kind: "roman", synopsis: "Malimouna, qui a fui une pratique traditionnelle imposée durant son enfance, revient au pays après des années d’absence et choisit de lutter pour les droits des femmes.", themes: ["Condition féminine", "Tradition", "Émancipation"], angle: "Le roman oppose moins tradition et modernité qu’il ne questionne les pratiques et les rapports de pouvoir. Suivez la construction de l’engagement de Malimouna." },
    { title: "Le Petit Garçon bleu", author: "Fatou Keïta", kind: "autres", synopsis: "Un récit pour la jeunesse qui accompagne un enfant dans une aventure d’apprentissage, avec une attention portée à l’amitié, à la différence et à la confiance.", themes: ["Enfance", "Amitié", "Différence"], angle: "Dans un récit jeunesse, les épreuves structurent souvent l’apprentissage. Repérez ce que le personnage découvre sur lui-même et sur les autres." },
    { title: "La Voleuse de sourires", author: "Fatou Keïta", kind: "autres", synopsis: "Un récit destiné aux jeunes lecteurs qui aborde les émotions, les relations et la manière dont un événement peut transformer le regard porté sur autrui.", themes: ["Émotions", "Enfance", "Relations"], angle: "Le sourire peut fonctionner comme motif de lien ou de perte. Suivez ses apparitions et leur évolution dans le récit." },
    { title: "À l’autre bout du monde", author: "Fatou Keïta", kind: "autres", synopsis: "Un récit pour la jeunesse autour du déplacement et de la découverte, où l’ailleurs devient l’occasion d’apprendre à regarder autrement son environnement.", themes: ["Voyage", "Découverte", "Ouverture"], angle: "Étudiez la fonction du voyage : est-il seulement géographique, ou transforme-t-il aussi les idées et les relations du personnage ?" },
    { title: "Bintou", author: "Koffi Kwahulé", kind: "theatre", synopsis: "Dans une cité urbaine, Bintou, adolescente prise entre son désir d’émancipation et les normes d’un groupe, devient le centre d’une tragédie contemporaine.", themes: ["Jeunesse", "Violence", "Normes sociales"], angle: "La pièce fait entendre des voix en conflit. Analysez le rythme des dialogues, la place du groupe et la manière dont la tragédie se construit." },
    { title: "Jaz", author: "Koffi Kwahulé", kind: "theatre", synopsis: "Un monologue théâtral donne voix à une femme après une agression, dans une écriture qui travaille la mémoire traumatique, la musique et la reprise de parole.", themes: ["Violence faite aux femmes", "Mémoire", "Parole"], angle: "La musicalité du texte n’efface pas la violence : elle permet d’étudier comment la parole tente de reprendre forme face au traumatisme." },
    { title: "Big Shoot", author: "Koffi Kwahulé", kind: "theatre", synopsis: "Un interrogatoire devient un spectacle de pouvoir où la parole, la mise en scène et la violence médiatique brouillent les frontières entre justice et divertissement.", themes: ["Médias", "Pouvoir", "Spectacle"], angle: "Le titre associe l’image du tournage à celle du coup de feu. Étudiez le rôle du public et la transformation de la violence en spectacle." },
];

let selectedFilter = "all";
let previouslyFocusedElement = null;

const genreLabels = {
    roman: "Roman",
    poesie: "Poésie",
    theatre: "Théâtre",
    autres: "Conte, récit ou littérature jeunesse"
};

function makeTextElement(tagName, className, text) {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    element.textContent = text;
    return element;
}

function createWorkCard(work, index) {
    const slug = `oeuvre-${index + 5}`;
    work.id = slug;
    const card = document.createElement("article");
    card.className = "book-card added-work";
    card.dataset.kind = work.kind;
    card.dataset.search = normalizeText([
        work.title,
        work.author,
        work.synopsis,
        work.themes.join(" "),
        work.angle,
        genreLabels[work.kind]
    ].join(" "));

    const cover = document.createElement("a");
    cover.className = `book-image generated-cover cover-${work.kind}`;
    cover.href = `#${slug}`;
    cover.setAttribute("aria-label", `Lire la fiche de ${work.title}`);
    const coverImage = document.createElement("img");
    coverImage.className = "generated-cover-image";
    coverImage.src = `https://picsum.photos/seed/${slug}/900/1100`;
    coverImage.alt = "";
    coverImage.loading = "lazy";
    coverImage.decoding = "async";
    cover.append(coverImage);
    cover.append(makeTextElement("span", "image-index", `${String(index + 5).padStart(2, "0")} / ${genreLabels[work.kind].toLocaleUpperCase("fr")}`));
    cover.append(makeTextElement("span", "book-cover-label", work.title));
    card.append(cover);

    const content = document.createElement("div");
    content.className = "book-card-content";
    const meta = document.createElement("div");
    meta.className = "book-meta";
    meta.append(makeTextElement("span", "", work.author));
    meta.append(makeTextElement("span", "", genreLabels[work.kind]));
    content.append(meta);
    content.append(makeTextElement("h3", "", work.title));
    content.append(makeTextElement("p", "", work.synopsis));

    const tags = document.createElement("div");
    tags.className = "tag-row";
    work.themes.slice(0, 3).forEach((theme) => tags.append(makeTextElement("span", "", theme)));
    content.append(tags);

    const readButton = makeTextElement("button", "read-button", "Découvrir l’analyse");
    readButton.type = "button";
    readButton.dataset.open = slug;
    readButton.append(makeTextElement("span", "", "↗"));
    content.append(readButton);
    card.append(content);
    return card;
}

additionalWorks.forEach((work, index) => bookGrid.append(createWorkCard(work, index)));
bookCards = [...document.querySelectorAll(".book-card")];

function normalizeText(value) {
    return value
        .toLocaleLowerCase("fr")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function updateBookList() {
    const query = normalizeText(searchInput.value.trim());
    let visibleCount = 0;

    bookCards.forEach((card) => {
        const matchesFilter = selectedFilter === "all" || card.dataset.kind === selectedFilter;
        const matchesSearch = query === "" || normalizeText(card.dataset.search).includes(query);
        card.hidden = !(matchesFilter && matchesSearch);
        if (!card.hidden) visibleCount += 1;
    });

    noResults.hidden = visibleCount > 0;
    catalogCount.textContent = `${visibleCount} œuvre${visibleCount > 1 ? "s" : ""} affichée${visibleCount > 1 ? "s" : ""} sur 50`;
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedFilter = button.dataset.filter;
        filterButtons.forEach((filterButton) => {
            const isSelected = filterButton === button;
            filterButton.classList.toggle("selected", isSelected);
            filterButton.setAttribute("aria-pressed", String(isSelected));
        });
        updateBookList();
    });
});

searchInput.addEventListener("input", updateBookList);

document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTyping = target instanceof HTMLElement
        && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
    if (event.key === "/" && !isTyping && !bookDialog.open) {
        event.preventDefault();
        searchInput.focus();
    }
});

function openBookSheet(templateId) {
    const template = document.getElementById(templateId);
    previouslyFocusedElement = document.activeElement;
    dialogContent.replaceChildren();
    if (template instanceof HTMLTemplateElement) {
        dialogContent.append(template.content.cloneNode(true));
    } else {
        const work = additionalWorks.find((item) => item.id === templateId);
        if (!work) return;
        dialogContent.append(makeTextElement("p", "eyebrow", `Fiche de lecture · ${genreLabels[work.kind]}`));
        dialogContent.append(makeTextElement("h2", "", work.title));
        dialogContent.append(makeTextElement("p", "dialog-byline", work.author));

        const summary = document.createElement("section");
        summary.className = "analysis-block";
        summary.append(makeTextElement("h3", "", "Résumé et repères de contexte"));
        summary.append(makeTextElement("p", "", work.synopsis));
        summary.append(makeTextElement("p", "", `Cette notice situe l’œuvre dans le parcours de ${work.author} et présente son point de départ sans remplacer une lecture intégrale. Pour un résumé scène par scène, vérifiez le contenu de l’édition utilisée en classe.`));
        dialogContent.append(summary);

        const themesSection = document.createElement("section");
        themesSection.className = "analysis-block generated-themes";
        themesSection.append(makeTextElement("h3", "", "Thèmes à explorer"));
        const themesList = document.createElement("ul");
        work.themes.forEach((theme) => themesList.append(makeTextElement("li", "", theme)));
        themesSection.append(themesList);
        dialogContent.append(themesSection);

        const readingNote = document.createElement("div");
        readingNote.className = "teacher-note";
        readingNote.append(makeTextElement("strong", "", "Piste d’analyse"));
        readingNote.append(makeTextElement("p", "", work.angle));
        dialogContent.append(readingNote);
        dialogContent.append(makeTextElement("p", "source-note", "Notice pédagogique originale. Vérifiez les informations bibliographiques et les détails de l’intrigue dans l’œuvre et dans l’édition au programme."));
    }
    bookDialog.showModal();
}

document.querySelectorAll("[data-open]").forEach((button) => {
    button.addEventListener("click", () => openBookSheet(button.dataset.open));
});

document.querySelectorAll(".book-image[href^='#fiche-'], .book-image[href^='#oeuvre-']").forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        openBookSheet(link.getAttribute("href").slice(1));
    });
});

bookDialog.addEventListener("click", (event) => {
    if (event.target === bookDialog) bookDialog.close();
});

bookDialog.addEventListener("close", () => {
    dialogContent.replaceChildren();
    if (previouslyFocusedElement instanceof HTMLElement) previouslyFocusedElement.focus();
});

newsletterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newsletterMessage.textContent = "Merci pour votre intérêt. Cette maquette n’envoie ni ne conserve votre adresse e-mail.";
    newsletterForm.reset();
});

updateBookList();