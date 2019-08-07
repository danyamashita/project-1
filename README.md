# Front
Ironhack project 1

Front is a board game from the 70's. Your goal is to capture enemy flag or kill all enermies

## Getting Started

The game is turn based. First you position all your pieces and then the enemy position all his pieces, and finally the game begins with each one taking a turn and being able to move your pieces, one at a time. Moving pieces can go to any adjacent square.
So far it was implemented the following pieces (in rank order):
1. *Flag*: Your goal is to capture enemies flag. Guard it well
2. *Bombs*: It can't move or attack but if any enemy with the exception of BombDefusers and Marshal steps on it, it will explode them.
3. *Soldier*: This is the weakest piece, it serves well to explore the board.
4. *BombDefusers*: He can kill only soldiers but it also very usefull as he is the only one with the exception of the Marshal who can sucessfully enter in Bombs territory. 
5. *Sergeant*: He is stronger than the Soldier and BombDefuser.
6. *Lieutenant*: He is stronger than the previous listed
7. *Marshal*: He is the one, he will kill any enemy he faces
8. *Spy*: He will come from the shadows and kill anyone he attacks, including the almighty Marshal, except Bombs, which he will explode. On the other hand he will die if any other piece attacks him, as his defense is the same as a Soldier.

When 2 pieces from different players occupies the same square, pieces are turned and the one with higher rank wins, with the following exception:
1. Bombs kills any enemy that enters its square, except BombDefusers and the Marshal
2. Marshal wins all battles, except when faces another Marshal or is attacked by the Spy
3. The Spy kills all units that he attacks, except Bombs, which will explode him.


## Authors

* **Dan Yamashita** 
