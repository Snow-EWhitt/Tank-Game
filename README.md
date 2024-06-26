# Tank Game

## Requirements
1. Use of Local Storage
2. Client side state stores (e.g. redux or context)
3. Toasts / global notifications or alerts
4. Error handling (both on api requests and render errors)
5. Network Calls
    - read data
    - write data
    - websocket
6. Developer type helping (typescript)
7. 10+ pages via a router
8. CI/CD pipeline
    - https support
    - Live production environment
    - Automated testing and linting in the pipeline (abort build if fails)
9. 3+ generic form input components
10. 4+ generic layout components
11. authentication and user account support
    - admin pages and public pages

## Tasks
### Nov 4th
- [x] Deployment pipeline
- ~~[ ] Create game match~~
  - ~~[ ] Page exists~~
  - ~~[ ] Just get map created~~
  - ~~[ ] Get player to appear when game starts (just one player)~~
- ~~[ ] Start on tank maneuverability~~
### Nov 11th
- [x] Create game match
  - [x] Page exists
  - [x] Just get map created
  - [x] Get player to appear when game starts (just one player)
- [x] Start on tank maneuverability
- [x] Finish tank maneuverability
  - [x] Forwards & backwards
  - [x] Rotation
  - [x] Cannon direction is different from body direction
- ~~[ ] Get projectiles to work~~
- [ ] Projectile bouncing
- ~~[ ] Projectile collision (When a projectile hits the tank, then game over)~~
### Nov 18th
- ~~[ ] Boundary logic (for player)~~
- ~~[ ] Add second player for local machine~~
- ~~[ ] Profiles (One user logs in to play a game)~~
- ~~[ ] Match results~~
- [ ] Finite number of projectile bounces
### Nov 25th
- ~~[ ] Set up an API for websockets~~
- ~~[ ] Real-time multiplayer (from multiple machines)~~
  - ~~[ ] Host machine creates game (in pending state until P2 joins, loading screen)~~
  - [ ] Client machine joins using generated game ID from host machine (join game page)
  - ~~[ ] Client just displays data and send events to host, host performs all game logic~~
### Dec 2
- [x] Get projectiles to work
- [x] Boundary logic (for player)
- [x] Add second player for local machine
- [x] Projectile collision (When a projectile hits the tank, then game over)
- [x] Match results
- [ ] Obstacles for game
- [ ] Styling for tanks, tiled map, projectiles
- [ ] CSS animations for: tank movement, projectiles, tank rotation
- [ ] Tank cannon rotation track mouse
- [ ] Match settings (bounce count, map selection)
- [ ] Global match history page
### Dec 9 (due date)
- [x] Profiles (One user logs in to play a game)
- [x] Set up an API for websockets
- [x] Real-time multiplayer (from multiple machines)
  - [x] Host machine creates game (in pending state until P2 joins, loading screen)
  - [x] Client just displays data and send events to host, host performs all game logic
- [ ] Another round of styling touch-ups
- [ ] Implement three power-ups
  - [ ] Info page about each power-up
