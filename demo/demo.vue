<template>
  <div></div>
</template>

<script>
export default {};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

#phone {
  /* display: flex; */
  /* flex-direction: column; */
  width: 100%;
  position: relative;
  width: 350px;
  height: 750px;
  border-radius: 12px;
  left: 50%;
  transform: translate(-50%, 0);
}
#phone .header .content .footer {
  width: 100%;
}
#phone .header {
  position: relative;
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

  margin: 2px 5px 0 0;
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

.content {
  /* flex: 1 1 auto; */
  position: relative;
  overflow: scroll;
  height: 590px;
  background-color: #f5f5f5;
}
.content .view {
  position: relative;
  /* margin: 0 2px 0 2px; */
}

.footer {
  height: 75px;
  background-color: #f8f8ff;
  border-radius: 0 0 30px 30px;
}
.footer ul {
  display: flex;
  list-style-type: none;
  margin-top: 0;
}
.footer ul li {
  flex: 1;
}
.footer ul li i {
  font-weight: 400;
  font-style: normal;
  font-size: small;
}
.footer ul li svg {
  display: block;
  margin-top: 10px;
}
</style>