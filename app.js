function getRandomValue(min, max) {
  return Math.floor(Math.random() * (min - max));
}

const app = Vue.createApp({
  data() {
    return {
      playerHP: 100,
      monsterHP: 120,
    };
  },
  methods: {
    attackMonster() {
      const attackVal = getRandomValue(5, 15);
      this.monsterHP -= attackVal;
      this.attackPlayer;
    },
    attackPlayer() {
      const attackVal = getRandomValue(5, 10);
      this.playerHP -= attackVal;
    },
  },
});
app.mount("#game");
