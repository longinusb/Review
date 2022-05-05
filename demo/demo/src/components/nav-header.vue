<template>
  <div class="header">
    <div class="up">
      <span class="time">19:19</span>
      <div class="top"></div>
      <i
        ><svg
          t="1651078343215"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6754"
          width="25"
          height="25"
        >
          <path
            d="M145.8 675h535.6V349.3H145.8V675z m773.7-244.3v-81.4c0-44.8-36.6-81.4-81.4-81.4H145.8c-44.8 0-81.4 36.6-81.4 81.4V675c0 44.8 36.6 81.4 81.4 81.4H838c44.8 0 81.4-36.6 81.4-81.4v-81.4c22.4 0 40.7-18.3 40.7-40.7v-81.4c0.1-22.4-18.2-40.8-40.6-40.8z m-40.7 40.8V675c0 22.4-18.3 40.7-40.7 40.7H145.8c-22.4 0-40.7-18.3-40.7-40.7V349.3c0-22.4 18.3-40.7 40.7-40.7H838c22.4 0 40.7 18.3 40.7 40.7v122.2h0.1z"
            fill=" #f5f5f5"
            p-id="6755"
          ></path></svg
      ></i>
      <span class="power">100%</span>
    </div>
    <div class="down">
      <span>简单优购</span>
      <div class="down-btn">
        <i
          ><svg
            t="1651073056837"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="8555"
            width="20"
            height="20"
          >
            <path
              d="M344 511.992a168 168 0 1 0 336 0 168 168 0 1 0-336 0zM744 512a120 120 0 1 0 240 0 120 120 0 1 0-240 0zM40.32 512a120 120 0 1 0 240 0 120 120 0 1 0-240 0z"
              p-id="8556"
            ></path></svg
        ></i>
        <i
          ><svg
            t="1651073267715"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9380"
            width="25"
            height="25"
          >
            <path
              d="M483.555556 312.888889m28.444444 0l0 0q28.444444 0 28.444444 28.444444l0 341.333334q0 28.444444-28.444444 28.444444l0 0q-28.444444 0-28.444444-28.444444l0-341.333334q0-28.444444 28.444444-28.444444Z"
              p-id="9381"
            ></path></svg
        ></i>
        <i
          ><svg
            t="1651072941020"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="7053"
            width="20"
            height="20"
          >
            <path
              d="M512 0C228.96 0 0 228.96 0 512c0 283.04 228.96 512 512 512 283.04 0 512-228.96 512-512C1024 228.96 795.04 0 512 0z m0 903.52c-216.8 0-391.52-174.72-391.52-391.52 0-216.8 174.72-391.52 391.52-391.52 216.8 0 391.52 174.72 391.52 391.52 0 216.8-174.72 391.52-391.52 391.52z"
              fill="#515151"
              p-id="7054"
            ></path>
            <path
              d="M316.16 512c0 108.16 87.68 195.84 195.84 195.84S707.84 620.16 707.84 512 620.16 316.16 512 316.16 316.16 403.84 316.16 512z m0 0"
              fill="#515151"
              p-id="7055"
            ></path></svg
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.header {
  position: relative;
  width: 100%;
  height: 80px;
  background-color: #c00000;
  border-radius: 30px 30px 0 0;
}
.header .up,
.down {
  position: relative;
  height: 40px;
}
.header .up span.time {
  float: left;
  margin: 12px 0 0 15px;
  font-size: small;
  color: #f5f5f5;
}
.header .up span.power {
  float: right;
  margin: 12px 5px 0 0;
  font-size: small;
  color: #f5f5f5;
}
.header .up i {
  float: right;
  margin: 10px 7px 0 0;
  color: #f5f5f5;
}
.header .up .top {
  position: absolute;
  width: 195px;
  height: 30px;
  background-color: black;
  border-radius: 0 0 20px 20px;

  left: 50%;
  transform: translate(-50%, 0);
}
.header .down .down-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;

  margin: 2px -15px 0 0;
  width: 80px;
  height: 30px;
  background-color: #c4c4c4;
  border-radius: 20px;
}
.header .down .down-btn i {
  margin-top: 4px;
}
.header .down span {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: small;
  color: #f5f5f5;
}
</style>
