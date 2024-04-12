const poems = [
`O noon of life! O time to celebrate!
O summer garden!
Restless happiness in standing, watching and waiting: —
I await friends, ready day and night
Where are you friends? Come! It's time! It's time!`,

`In the heights my table was set for you: —
<a href="" target="_blank">Who lives so close to the stars</a>
To the grey yonder of the abyss?
My realm—what realm stretches further?
And my honey—who has tasted it? .....`,

`— There you are, friends!— Alas, but I am not
The one you wanted?
You <a href="" target="_blank">hesitate</a>, amazed—oh, you are quite sullen!
I—am no longer the same? Hands, face, gait have changed?
And what I am, to you friends—I am not?`,

`Am I another? A stranger to myself?
Sprung from myself?
A wrestler, who too often subdued himself?
Too often resisted his own strength,
Wounded and stopped by his own victory?`,

`I sought where the most biting wind blows?
I learned to live
Where no one lives, in desolate <a href="" target="_blank">polar zones</a>,
Unlearned man and god, curse and prayer?
Become a ghost who crosses <a href="" target="_blank">glaciers</a>?`,

`<a href="" target="_blank">— My old friends! Now how pale you look!
Full of love and fear!
No, leave! Do not be angry! You—cannot live here:
Here among this most remote realm of ice and rock—
Here one has to be a hunter and chamois-like.</a>`,

`I've become a <a href="" target="_blank">wicked hunter!</a>— Look how much
My bow is bent!
The strongest was he who drew his bow like this— —:
But now alas! No arrow is dangerous
As that arrow,—away from here! For your own good! .....`,

`You turn away?— O heart, you have borne enough,
Your hope stayed strong:
<a href="" target="_blank">Keep your door open to new friends!
Let the old go! Let the memories go!
Once you were young, now—you are younger!</a>`,

`What once tied us together, one hope's bond —
Who still reads the signs
Love once inscribed on it, the faded ones?
I compare it to parchment that the hand
Is afraid to grasp,—like parchment that is discolored, burnt.`,

`No longer friends, they are—what should I call them?—
Nothing but ghosts of friends!
That knock at my heart and window nightly,
That look at me and say: "were we once friends?" —
— O withered word, once fragrant as the rose!`,

`O longing of youth that misunderstood itself!
Those I longed for,
Those I deemed changed into my kin,
That they have aged has driven them away:
Only he who changes remains akin to me.`,

`<a href="" target="_blank">O noon of life! Second time of youth!
O summer garden!
Restless happiness in standing, watching and waiting!
I await friends, ready day and night,
New friends! Come! It's time! It's time!</a>`,

`This song is over—the sweet cry of longing
Died in my mouth—
A sorceror did it, the friend at the right time,
The friend of noon—no! do not ask who he is—
At noon was the time one became two ...`,

`Now we celebrate together, certain of victory,
The feast of feasts:
Friend Zarathustra has come, the guest of guests!
Now the world laughs, the dread curtain is rent,
The wedding has come for light and darkness .....`,

``,
];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

function distributePoems() {
    const columns = document.querySelectorAll('.col');
    let contentItems = poems.flatMap(poem => poem.split('\n')); // Flatten array of all paragraphs
    shuffleArray(contentItems); // Shuffle the paragraphs

    // Assuming the range for the maximum number of images
    const maxImages = 20;
    let imagePaths = [];
    for (let i = 1; i <= maxImages; i++) {
        imagePaths.push(`images/${i}.png`); // Prepare the image paths
    }
    shuffleArray(imagePaths); // Shuffle image paths for random insertion

    // Randomly intersperse image paths into the contentItems
    imagePaths.forEach(imagePath => {
        const position = getRandomInt(0, contentItems.length);
        contentItems.splice(position, 0, imagePath); // Insert the image path
    });

    contentItems.forEach((item, index) => {
        const columnIndex = index % columns.length;
        const container = document.createElement('div');

        if (item.startsWith('images/')) { // If the item is an image
            const img = document.createElement('img');
            img.src = item;
            img.alt = 'Inserted Image';
            img.onerror = () => img.style.display = 'none'; // Hide if image doesn't load
            container.appendChild(img);
        } else { // If the item is a paragraph
            const paragraph = document.createElement('p');
            paragraph.innerHTML = item;

            // Apply random number of <br> tags
            for (let i = 0; i < getRandomInt(1, 4); i++) {
                paragraph.innerHTML += '<br>';
            }

            // Randomly apply a font size range from 2vh to 5vh for the paragraph
            paragraph.style.fontSize = `${getRandomInt(2, 5)}vh`;

            container.appendChild(paragraph);
        }

        columns[columnIndex].appendChild(container);
    });
}

document.addEventListener('DOMContentLoaded', distributePoems);
  
  
let wheel = 0, lastOffset = 0, lastY = 0, pos = 0;
let [x, y, z] = [0, 0, 0];
const leading = 100, title = document.title + ' ';

const tickTitle = () => document.title = title.substring(pos) + title.substring(0, pos++);
const adjustContent = (up) => {
    document.querySelectorAll('.col').forEach((col) => {
        const items = col.querySelectorAll('div'); // Select divs instead of p
        if (up) {
            col.insertBefore(items[items.length - 1], items[0]);
        } else {
            col.appendChild(items[0]);
        }
    });
};


window.addEventListener('devicemotion', ({accelerationIncludingGravity: {x: newX, y: newY, z: newZ}}) => {
  if(Math.max(Math.abs(x - newX), Math.abs(y - newY), Math.abs(z - newZ)) > 0.2) adjustContent();
  [x, y, z] = [newX, newY, newZ];
});

['touchstart', 'touchmove', 'mousewheel'].forEach(type => window.addEventListener(type, (event) => {
  if (type === 'touchstart') lastY = event.touches[0].clientY;
  else {
    event.preventDefault();
    const currentY = event.touches?.[0].clientY || 0;
    const deltaY = (type === 'touchmove' ? currentY - lastY : event.deltaY);
    wheel += deltaY;
    const offset = Math.floor(wheel / leading) * leading;
    if (lastOffset !== offset) adjustContent(deltaY > 0);
    lastOffset = offset;
    if (type === 'touchmove') lastY = currentY;
  }
}));

setInterval(() => { if(pos > title.length) pos = 0; tickTitle(); }, 1000);


