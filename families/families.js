import { checkAuth, deleteBunny, getFamilies, logout } from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

function displayFamilies(families) {
    familiesEl.textContent = '';
    //why not a separate render file? bc youre calling bunnies from each fam
    // fetch families from supabase
    // clear out the familiesEl
    // loop through each family and for each family:
    // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
    // your HTML Element should look like this:
    // <div class="family">
    //    <h3>the Garcia family</h3>
    //    <div class="bunnies">
    //        <div class="bunny">Fluffy</div>
    //        <div class="bunny">Bob</div>
    //    </div>
    // </div>

    for (let family of families) {
        const familyDiv = document.createElement('section');
        const familyName = document.createElement('h2');
        const bunnyDiv = document.createElement('div');

        bunnyDiv.classList.add('bunnies');
        familyDiv.classList.add('family');

        familyName.textContent = family.name;

        for (let bunny of family.fuzzy_bunnies) {
            const bunnyEl = document.createElement('div');

            bunnyEl.classList.add('bunny');
            bunnyEl.textContent = bunny.name;

            bunnyEl.addEventListener('click', async () => {
                await deleteBunny(bunny.id);

                const updatedFamilies = await getFamilies();

                displayFamilies(updatedFamilies);
            });

            bunnyDiv.append(bunnyEl);
        }

        familyDiv.append(familyName, bunnyDiv);
        familiesEl.append(familyDiv);
    }
    // add the bunnies css class to the bunnies el, and family css class to the family el
    // put the family name in the name element
    // for each of this family's bunnies
    //    make an element with the css class 'bunny', and put the bunny's name in the text content
    //    add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
    // append this bunnyEl to the bunniesEl
    // append the bunniesEl and nameEl to the familyEl
    // append the familyEl to the familiesEl
}

window.addEventListener('load', async () => {
    const families = await getFamilies();

    displayFamilies(families);
});
