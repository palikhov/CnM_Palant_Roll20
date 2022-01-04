# Roll20Content

Welcome to the Roll20 Resource Repository.

A location for resources to help you make (more) fun in your games, in less time.

This repository holds resources to use within Roll20, follow these links organized by subject.

 ⁍ [Animated Backgrounds](https://github.com/DMsGuild201/Roll20_resources/blob/master/Animated/README.md)

 ⁍ [Bestiary](https://github.com/DMsGuild201/Roll20_resources/blob/master/Bestiary/README.md) 
 
 ⁍ [External Art](https://github.com/DMsGuild201/Roll20_resources/blob/master/ExternalArt/README.md)
  
 ⁍ [Macro](https://github.com/DMsGuild201/Roll20_resources/blob/master/Macro/README.md)
 
 ⁍ [Module](https://github.com/DMsGuild201/Roll20_resources/blob/master/Module/README.md)
 
 ⁍ [NPC](https://github.com/DMsGuild201/Roll20_resources/blob/master/NPC/README.md)
 
 ⁍ [Playlist](https://github.com/DMsGuild201/Roll20_resources/blob/master/playlist/README.md)
 
 ⁍ [Table](https://github.com/DMsGuild201/Roll20_resources/blob/master/Table/README.md)


Please feel free to contribute.

---

## Development

Node.js is required.

To use Google API functionality, a client ID/secret is required; see Step 1 [here](https://developers.google.com/sheets/api/quickstart/nodejs).
Download the `credentials.json` file it provides, and **place the file in the project root**. 

**DO NOT commit this file** or otherwise share it, as it provides various access permissions to the Google account which was used to create it. Similarly, `token.json` (which the login process generates) should be kept private.

**Note:** if you have an existing `token.json` but are failing to log in (e.g. due to an `invalid_grant` error), try deleting the `token.json` and re-running the script.

