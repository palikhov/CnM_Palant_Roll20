/* Wild Magic Surge table generator by tobloef

Paste this into your browser's developer console (F12)

The script will create a rollable table named "Wild Magic Surge" with all 50 possibilities.
You can of course use this script to create other rollable tables, all you have to do is to replace the values in the rows variable.
You can also define a weight for each possibility by including a weight property like this:
{ name: "Some name here", weight: 2 }

Enjoy!
*/

(function(){
    const rows = [
        { name: "Roll on this table at the start of each of your turns for the next minute, ignoring this result on subsequent rolls." },
        { name: "For the next minute, you can see any invisible creature to which you have line of sight." },
        { name: "A MODRON chosen and controlled by the DM appears in an unoccupied space within 5ft of you, then disappears 1 minute later." },
        { name: "You cast FIREBALL as a 3rd level spell, centered on yourself." },
        { name: "You cast MAGIC MISSLE as a 5th level spell" },
        { name: "Your height changes 1d10 inches.  You shrink if the number is Odd, grow if the number is even." },
        { name: "You cast CONFUSION centered on yourself." },
        { name: "For the next minute you gain 5hp at the start of each of your turns." },
        { name: "You grow a long beard made of feathers that remains on your face until you sneeze, at which point the beard explodes out from your face." },
        { name: "You cast GREASE centered on yourself." },
        { name: "Creatures have disadvantage on saving throws against the next spell you cast that requires a saving throw in the next minute." },
        { name: "Your skin turns a vibrant shade of Blue.  A REMOVE CURSE spell can end this effect." },
        { name: "An eye appears in the center of your forehead for the next minute.  You gain advantage on Perception checks that involve sight." },
        { name: "For the next minute, all your spells with a casting time of 1 action now have a casting time of 1 bonus action." },
        { name: "You teleport up to 60ft to an unoccupied space of your choice that you can see." },
        { name: "You are transported to the Astral Plane until the end of your next turn, after which time you return to the space you previously occupied, or the nearest space that isn't." },
        { name: "Maximize the damage of the next damaging spell you cast within the next minute." },
        { name: "Your age changes 1d10 years.  You age if the number is Odd, become younger if the number is even." },
        { name: "1d6 FLUMPHS controlled by the DM appear in unoccupied spaces within 60ft of you and are frightened of you.  They vanish after 1 minute." },
        { name: "You regain 2d10 hit points." },
        { name: "You turn into a potted plant until the start of your next turn.  While a plant, you are incapacitated and have vulnerability to all damage.  If you drop to 0 hit points, your pot breaks and you revert to your form." },
        { name: "For the next minute, you can teleport up to 20ft as a bonus action on each of your turns." },
        { name: "You cast LEVITATE on yourself." },
        { name: "A UNICORN controlled by the DM appears in an unoccupied space within 5ft of you, then disappears 1 minute later." },
        { name: "You can't speak for the next minute.  Whenever you try, pink bubbles float out of your mouth." },
        { name: "A spectral shield hovers near you for the next minute, granting you a +2 bonus to AC and immunity to MAGIC MISSLE." },
        { name: "You are immune to being intoxicated by alcohol for the next 5d6 days." },
        { name: "Your hair falls out, but grows back within the next 24hrs." },
        { name: "For the next minute, any flammable object you touch that isn't being worn or carried by another creature bursts into flame." },
        { name: "You regain your lowest-level expended spell slot." },
        { name: "For the next minute, you must shout when you speak." },
        { name: "You cast FOG CLOUD centered on yourself." },
        { name: "Up to three creatures you choose within 30ft of you take 4d10 lightning damage." },
        { name: "You are frightened of the nearest creature until the end of your next turn." },
        { name: "Each creature within 30ft of you becomes invisible for the next minute.  The invisibility ends on a creature when it attacks or casts a spell." },
        { name: "You gain resistance to all damage for the next minute." },
        { name: "A random creature within 60ft of you becomes poisoned for 1d4 hours." },
        { name: "You glow with bright light in a 30-foot radius for the next minute.  Any creature that ends its turn within 5ft of you is blinded until the end of its next turn." },
        { name: "You cast POLYMORPH on yourself.  If you fail the saving throw, you turn into a sheep for the spell's duration." },
        { name: "Illusory butterflies and flower petals flutter in the air within 10ft of you for the next minute." },
        { name: "You can take one additional action immediately." },
        { name: "Each creature within 30ft of you takes 1d10 Necrotic damage.  You regain hit points equal to the sum of the damage dealt." },
        { name: "You cast MIRROR IMAGE." },
        { name: "You cast FLY on a random creature within 60ft of you." },
        { name: "You become invisible for the next minute.  During that time, other creatures cannot hear you.  The invisibility ends if you attack or cast a spell." },
        { name: "If you die within the next minute, you immediately come back to life as if by a REINCARNATE spell." },
        { name: "Your size increases by 1 category for the next minute." },
        { name: "You and all creatures within 30ft of you gain vulnerability to piercing damage for the next minute." },
        { name: "You are surrounded by faint, ethereal music for the next minute." },
        { name: "You regain all expended Sorcery Points!" },
    ];

    console.log("Creating table...");
    $("a[href='#deckstables'").click();
    $("#addrollabletable").click();
    setTimeout(function() {
        $(".rollabletable").find("td:contains('new-table')").last().parent().click();
        const tableWidget = $(".ui-dialog").find("span.ui-dialog-title:contains('new-table')").last().parent().parent();
        tableWidget.find("input.name").val("Wild Magic Surge");
        for (let i = 0; i < rows.length; i++) {
            tableWidget.find("button.addtableitem").click();
            const itemWidget = $(".ui-dialog").find("span.ui-dialog-title:contains('Edit Table Item')").last().parent().parent();
            itemWidget.find("input.name").val(rows[i].name);
            itemWidget.find("input.weight").val(rows[i].weight || 1);
            itemWidget.find("button span:contains('Save Changes')").click();
        }
        tableWidget.find("button span:contains('Save Changes')").click();
        console.log("Done!");
    }, 200);
})();
