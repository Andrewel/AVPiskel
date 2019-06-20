<template>
  <div id="page">
    <header class="header">
      <div class="div-avatar">
        <img
          class="div-avatar__img-photo"
          src="https://www.dropbox.com/s/r60jz1h7ys3euyj/andrewelphot.jpg?raw=1"
        >
      </div>
      <h1>Andrew Vlasov</h1>
      <section class="header__section-avatar">
        <p>
          Novice frontend-developer with technical education. Confident knowledge of HTML, CSS/SCSS,
          JavaScript,
          React, Redux, Vue, SQL, NoSQL.
        </p>
        <div class="div-socials">
          <a href="https://github.com/Andrewel" target="_blank">
            <i class="fab fa-github-alt"></i>
          </a>
          <a href="https://www.linkedin.com/in/Andrewel/" target="_blank">
            <i class="fab fa-linkedin-in"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank">
            <i class="fab fa-twitter"></i>
          </a>
          <p class="contact-details">
            <a href="tel:+35283318635">Phone: +375293144763</a> &nbsp; - &nbsp;
            <a href="mailto:@hexalcorp.com">
              Email:
              andrewelvlasov@gmail.com
            </a>
          </p>
        </div>
      </section>
    </header>
    <main class="main">
      <section class="section-skills">
        <h3>Technical Skills</h3>
        <div class="div-skills">
          <div class="div-column">
            <h4>Good knowledge</h4>
            <ul class="div-column__ul">
              <li>HTML5</li>
              <li>CSS</li>
              <li>JavaScript ES5/6</li>
              <li>C/C++</li>
              <li>Java/Kotlin</li>
              <li>SQL</li>
              <li>NoSQL/MongoDB/Firestore</li>
              <li>Vue</li>
              <li>AWS/Azure/Firebase</li>
            </ul>
          </div>
          <div class="div-column">
            <h4>Basic knowledge</h4>
            <ul class="div-column__ul">
              <li>Angular</li>
              <li>React</li>
              <li>NodeJS</li>
              <li>Python/Django</li>
            </ul>
          </div>
          <div class="div-column">
            <h4>Tools & Programming practices</h4>
            <ul class="div-column__ul">
              <li>Git, VS Code, Webstorm, IDEA, PyCharm</li>
              <li>Agile, Kanban</li>
              <li>Trello, Jira, Bitrix</li>
            </ul>
          </div>
        </div>
      </section>
      <section class="section-code">
        <h3>Code Review</h3>
        <div class="div-job-title">
          <strong>
            <a href="https://www.linkedin.com/in/Andrewel/" target="_blank">GitHub</a>
          </strong>
        </div>
      </section>
      <section class="section-experience">
        <h3>Professional Experience</h3>
        <div class="div-job-title">
          <span class="div-job-title__span">03.2019 - 06.2019</span>
          <strong>Community Lab</strong>
          <br>
          <strong>Position:</strong>
          Web
          developer
        </div>
        <div>
          <p>
            <strong>Tech stack:</strong> HTML5 / CSS / JavaScript / React/ Angular/ Vue
          </p>
          <ul class="job-description">
            <li>Develop web application with Tinder functionality</li>
            <li>UI/UX responsive design</li>
            <li>Back-end on Firebase</li>
          </ul>
        </div>
      </section>
      <section class="section-education">
        <h3>Education</h3>
        <div class="div-school">
          <span class="div-school__span">2016-2020</span>
          <strong>BSUIR</strong>
        </div>
        <div class="div-description">Bechelor Degree of Programming and Marketing</div>
      </section>
      <section class="section-language">
        <h3>Languages</h3>
        <div>
          <p>
            <strong>English</strong> - B1/B2
          </p>
          <p>
            <strong>Russian</strong> - Native speaker
          </p>
          <p>
            <strong>Polish</strong> - A2
          </p>
        </div>
      </section>
    </main>
    <footer class="footer">
      <p>
        <a href="https://www.linkedin.com/in/Andrewel/">Andrewel</a>
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'cv',
};
//import { getVueOptions } from './options';

//const name = 'creative';

//export default Vue.component(name, getVueOptions(name));
//export default Vue.component(name);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');

* {
  margin: 0;
  padding: 0;
}

#page {
  width: 80vw;
  background: whitesmoke;
  margin: 2% auto;
  padding: 0px;
  font-family: 'Roboto';
}

a {
  color: white;
  text-decoration: none;
}

a:hover {
  opacity: 0.5;
}

section {
  padding: 1vw;
}

.header,
.main,
.footer {
  margin: 0 auto;
}

.header {
  padding: 2vw;
  text-align: center;
  background-color: rgb(0, 0, 0);
  background-size: cover;
  color: white;
}

.header__section-avatar {
  margin: 0 auto;
  max-width: 45vw;
}

.div-avatar__img-photo {
  max-width: 12vw;
  clip-path: polygon(
    20% 0%,
    80% 0%,
    100% 20%,
    100% 80%,
    80% 100%,
    20% 100%,
    0% 80%,
    0% 20%
  );
}
.contact-details {
  position: relative;
  top: 2vw;
  background: rgb(0, 0, 0);
  color: white;
  border: 1px solid white;
  text-align: center;
  margin: auto;
  padding: 1vw;
  font-size: 1vw;
}

h1 {
  font-size: 4vw;
  text-transform: uppercase;
  margin: 1vw 0;
  color: white;
}

.div-socials {
  margin-top: 2vw;
}
.div-socials a {
  padding: 2vw;
}
h3,
h4 {
  font-weight: bold;
}

/* Titles of categories */
h3 {
  margin-bottom: 1vw;
  text-transform: uppercase;
  color: rgb(0, 0, 0);
}

/* There is a bar just before each category */
h3:before {
  content: '';
  display: inline-block;
  margin-right: 1%;
  width: 16vw;
  height: 10px;
  background-color: rgb(0, 0, 0);
}

h3:hover {
  background-color: rgb(0, 0, 0);
  color: #FFFFFF;
  text-shadow: 1px 1px 1px #333;
}

.main {
  text-align: left;
}
.main section:not(:last-child) {
  border-bottom: 1px solid rgb(0, 0, 0);
}

.fab {
  border: 1px solid white;
  border-radius: 50%;
  font-size: 1.5em;
  width: 1.5em;
  height: 1.5em;
  line-height: 1.5em;
  margin: 5px;
  text-align: center;
}

a .fab {
  color: white;
}

.course,
.div-skills {
  display: flex;
  flex-wrap: wrap;
}

.course .title {
  color: rgb(0, 0, 0);
  flex: 0 0 30%;
  max-width: 30%;
}

.course .div-description {
  flex: 0 0 60%;
  max-width: 60%;
}

.course .div-description p {
  padding-left: 1em;
}

.div-skills .div-column {
  flex: 0 0 50%;
  max-width: 50%;
}

.div-skills .div-column ul,
ul.job-description {
  list-style-type: none;
  margin-bottom: 1vw;
}

.div-skills .div-column ul > li:before {
  content: '-';
  padding-right: 0.5em;
  color: rgb(0, 0, 0);
}

.div-school,
.div-job-title a {
  color: rgb(0, 0, 0);
  text-transform: capitalize;
}

.div-school__span,
.div-job-title__span {
  color: rgb(0, 0, 0);
  text-decoration: underline;
  margin-right: 20px;
}

ul.job-description li:before {
  content: '+';
  padding-right: 0.5em;
  color: rgb(0, 0, 0);
}

.footer {
  padding: 1em 1.5em;
  background: rgb(0, 0, 0);
  color: white;
  text-align: center;
}
</style>