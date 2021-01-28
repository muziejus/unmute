import Component from '@glimmer/component';
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { htmlSafe } from '@ember/template';
import un from "unmute/svg-paths/un-window-path";
import slash from "unmute/svg-paths/slash-window-path";
import m from "unmute/svg-paths/m-window-path";
import u from "unmute/svg-paths/u-window-path";
import t from "unmute/svg-paths/t-window-path";
import e from "unmute/svg-paths/e-window-path";
import one1 from "unmute/svg-paths/one1";
import one2 from "unmute/svg-paths/one2";
import one3 from "unmute/svg-paths/one3";
import two from "unmute/svg-paths/two";
import zero1 from "unmute/svg-paths/zero1";
import zero2 from "unmute/svg-paths/zero2";
import zero3 from "unmute/svg-paths/zero3";
import zero4 from "unmute/svg-paths/zero4";
import zero5 from "unmute/svg-paths/zero5";
import zero6 from "unmute/svg-paths/zero6";
import launching from "unmute/svg-paths/launching";
import { select, selectAll } from "d3-selection";
import { easeBack } from "d3-ease";
import { transition } from "d3-transition";

export default class WelcomeScreenSvgComponent extends Component {

  @action
  waitAndLaunch() {
    const svgContainer = select("#unmute-svg-container").node();
    if (svgContainer.getBoundingClientRect().width < svgContainer.getBoundingClientRect().height) {
      select("#unmute-svg-container svg")
        .attr("width", "80%");
    }
    this.launchSlotMachine();
  };

  launchSlotMachine() {
    const yOffset = 100;
    const g = select("#svg-windows");
    // const g = d3.select("#svg-windows");
    this.data.splice(0, 0, {
      offset: 0,
      strip: [
        "<g></g>",
        "<g></g>",
        "<g></g>",
        "<g></g>",
        "<g></g>",
        "<g></g>",
        un]
    });
    g.selectAll("g")
      .data(this.data)
      .enter()
        .insert("g")
        .attr("class", (_, i) => `numeral-window window-${i}`)
        .attr("transform", d => `translate(${d.offset},${yOffset})`)
        .each(function(d) {
          select(this)
            .selectAll("g")
            .data(d.strip)
            .enter()
              .insert("g")
              .attr("transform", (_, i) => {
                return `translate(0, ${yOffset * i})`
              })
              .each(function(d) {
                select(this)
                  .html(htmlSafe(d))
              });
        });
    // d3.selectAll("g.numeral-window")
    selectAll("g.numeral-window")
      .transition()
      .delay(1000)
      .duration(2000)
      .ease(easeBack.overshoot(1))
      .attr("transform", d => {
        return `translate(${d.offset}, ${-(d.strip.length -2) * yOffset})`;
      })
      .transition()
      .delay(500)
      .duration(1500)
      .ease(easeBack.overshoot(1))
      .attr("transform", d => {
        return `translate(${d.offset}, ${-(d.strip.length -1) * yOffset})`;
      })
      .on("end", this.showLaunching);
  }

  showLaunching(){
    select("g#svg-launching")
      .style("opacity", 0)
      .html(htmlSafe(launching))
      .transition()
      .delay(0)
      .duration(1000)
      .style("opacity", 1);
  }


  data = [
    {
      strip: [one1],
      penultimate: one3,
      ultimate: slash,
      offset: 158.76,
    },
    {
      strip: [zero1],
      penultimate: zero4,
      ultimate: m,
      offset: 158.76 + 67.76,
    },
    {
      strip: [zero2],
      penultimate: zero5,
      ultimate: u,
      offset: 158.76 + 67.76 + 91.86,
    },
    {
      strip: [zero3],
      penultimate: zero6,
      ultimate: t,
      offset: 158.76 + 67.76 + 91.86 + 83.46,
    },
    {
      strip: [one2],
      penultimate: two,
      ultimate: e,
      offset: 158.76 + 67.76 + 91.86 + 83.46 + 83.46,
    },
  ]

  numerals = [
    [one1, one2, one3],
    [zero1, zero2, zero3,
      zero4, zero5, zero6],
  ]

  constructor() {
    super(...arguments);
    for (const wheel of this.data) {
      let i = 2;
      // let i = Math.floor(Math.random() * 10);
      while (i < 10){
        i += 1;
        const numeral = this.numerals[Math.floor(Math.random() * 2)]
        wheel.strip.push(numeral[Math.floor(Math.random() * numeral.length)]);
      }
      wheel.strip.push(wheel.penultimate);
      wheel.strip.push(wheel.ultimate);
    }
  }

  paths = {
    un: {
      path: htmlSafe(un),
      width: 158.76,
      offset: 0,
    },
    slash: {
      path: htmlSafe(slash),
      width: 67.76,
      offset: 158.76,
    },
    m: {
      path: htmlSafe(m),
      width: 91.86,
      offset: 158.76 + 67.76,
    },
    u: {
      path: htmlSafe(u),
      width: 83.46,
      offset: 158.76 + 67.76 + 91.86,
    },
    t: {
      path: htmlSafe(t),
      width: 83.46,
      offset: 158.76 + 67.76 + 91.86 + 83.46,
    },
    e: {
      path: htmlSafe(e),
      width: 83.46,
      offset: 158.76 + 67.76 + 91.86 + 83.46 + 83.46,
    },
    one1: {
      path: htmlSafe(one1)
    },
    one2: {
      path: htmlSafe(one2)
    },
    one3: {
      path: htmlSafe(one3)
    },
    two: {
      path: htmlSafe(two)
    },
    zero1: {
      path: htmlSafe(zero1)
    },
    zero2: {
      path: htmlSafe(zero2)
    },
    zero3: {
      path: htmlSafe(zero3)
    },
    zero4: {
      path: htmlSafe(zero4)
    },
    zero5: {
      path: htmlSafe(zero5)
    },
    zero6: {
      path: htmlSafe(zero6)
    },
  }
}