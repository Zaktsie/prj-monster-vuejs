function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHP: 100,
      monsterHP: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    mosnterBarStyles() {
      if (this.monsterHP < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHP + "%" };
    },
    playerBarStyles() {
      if (this.playerHP < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHP + "%" };
    },
    canUseSpeacial() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHP(value) {
      if (value <= 0 && this.monsterHP <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHP(value) {
      if (value <= 0 && this.playerHP <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHP = 100;
      this.monsterHP = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    attackMonster() {
      this.currentRound += 1;
      console.log("currentRound", this.currentRound);
      const attackVal = getRandomValue(5, 12);
      this.monsterHP -= attackVal;
      this.addLogs("Player", "attack", attackVal);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackVal = getRandomValue(8, 15);
      this.playerHP -= attackVal;
      this.addLogs("Monster", "attack", attackVal);
    },
    specialAttackMonster() {
      this.currentRound += 1;
      console.log("currentRound", this.currentRound);
      const attackVal = getRandomValue(12, 25);
      this.monsterHP -= attackVal;
      this.addLogs("Player", "attack", attackVal);
      this.attackPlayer();
    },
    healPlayerHP() {
      this.currentRound += 1;
      const healVal = getRandomValue(8, 20);
      if (this.playerHP + healVal > 100) {
        this.playerHP = 100;
      } else {
        this.playerHP += healVal;
      }

      this.addLogs("Player", "Heal", healVal);
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    addLogs(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actioValue: value,
      });
    },
  },
});
app.mount("#game");
