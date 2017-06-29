# Bramagrams

My favorite game, based on the classic Bananagrams, written using React. The rules are as follows:

# Gameplay
- All tiles start face down in the middle
- Each player takes their turn in succession, flipping over one of the letters in the middle.
- At any time, if a player sees an opportunity to construct a word from the letters in the middle, to fortify one of their own words, or to steal a word from another player, they call out the new word and take it.
- The game continues and the turns reset so that the player who just took a new word goes next.

# Word Constraints
- A player can steal an opponent's word or fortify their own word by incorporating one or more letters from the middle into an existing word, and also potentially rearranging the letters in the word.
- Each word must have at least 3 letters.
- A new stolen or fortified word cannot have the same semantic root as the old word: ex. dog to dogs, eat to eating, sugar to sugary.

# Winning
- The player with the most words at the end of the game wins!
