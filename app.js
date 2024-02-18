function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHP: 100,
      monsterHP: 100,
      currentRound: 0,
    };
  },
  computed: {
    mosnterBarStyles() {
      return { width: this.monsterHP + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHP + "%" };
    },
    canUseSpeacial() {
      return this.currentRound % 3 !== 0;
    },
  },
  methods: {
    attackMonster() {
      this.currentRound += 1;

      console.log("currentRound", this.currentRound);
      const attackVal = getRandomValue(5, 15);
      this.monsterHP -= attackVal;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackVal = getRandomValue(8, 15);
      this.playerHP -= attackVal;
    },
    specialAttackMonster() {
      this.currentRound += 1;
      console.log("currentRound", this.currentRound);
      const attackVal = getRandomValue(10, 25);
      this.monsterHP -= attackVal;
      this.attackPlayer();
    },
  },
});
app.mount("#game");
