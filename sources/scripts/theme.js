function Theme()
{
  this.el = document.createElement("style");
  this.active = null;

  this.default = { background: "#000",f_high: "white",f_med: "#a93232",f_low: "#cccccc",f_inv: "#a93232",b_high: "#ffffff",b_med: "#000000",b_low: "#333333",b_inv: "#a93232"}

  this.start = function()
  {
    document.body.appendChild(this.el)
    
    if(localStorage.theme && is_json(localStorage.theme)){
      console.log("Theme","Found in localStorage")
      this.install(JSON.parse(localStorage.theme));  
    }
    else{
      console.log("Theme","Creating new")
      this.install(this.default);
    }
  }

  this.save = function()
  {
    localStorage.setItem("theme", JSON.stringify(this.active));
    console.log("Theme","Saved");
  }

  this.load = function(theme_str)
  {
    if(is_json(theme_str)){
      this.install(JSON.parse(theme_str));
    }
    console.log("Theme","Loaded");
  }

  this.install = function(theme)
  {
    var html = "";

    this.active = theme;

    html += "body { background:"+theme.background+" !important }\n";
    html += ".fh { color:"+theme.f_high+" !important; stroke:"+theme.f_high+" !important }\n";
    html += ".fm { color:"+theme.f_med+" !important ; stroke:"+theme.f_med+" !important }\n";
    html += ".fl { color:"+theme.f_low+" !important ; stroke:"+theme.f_low+" !important }\n";
    html += ".f_inv { color:"+theme.f_inv+" !important ; stroke:"+theme.f_inv+" !important }\n";
    html += ".bh { background:"+theme.b_high+" !important; fill:"+theme.b_high+" !important }\n";
    html += ".bm { background:"+theme.b_med+" !important ; fill:"+theme.b_med+" !important }\n";
    html += ".bl { background:"+theme.b_low+" !important ; fill:"+theme.b_low+" !important }\n";
    html += ".b_inv { background:"+theme.b_inv+" !important ; fill:"+theme.b_inv+" !important }\n";
    html += ".b { background:"+theme.background+" !important }\n";

    html += `

svg .fill_red { fill:${theme.b_inv} !important }
#board card.heart .face { color:${theme.b_inv} !important;}
#board card.diamond .face { color:${theme.b_inv} !important;}

svg .fill_white { fill:${theme.b_high} !important }
#player a.escape { border:2px solid ${theme.b_high} !important; color: ${theme.b_high}; }
#board card .face { background:${theme.b_high}}
.card_11 .face .name,.card_13 .face .name,.card_15 .face .name,.card_17 .face .name { color:${theme.b_high};}
#player .gage { color:${theme.b_high} }

svg .fill_black { fill:${theme.b_med} !important }
#board card.clove .face { color:${theme.b_med} !important;}
#board card.spade .face { color:${theme.b_med} !important;}
#board card.joker .face { color:${theme.b_med} !important;}

svg .stroke_white { stroke:${theme.b_high} !important }
svg .stroke_black { stroke:${theme.b_med} !important }
svg .stroke_grey { stroke:${theme.f_low} !important }
svg .fill_grey { fill:${theme.f_low} !important }

#table card { background:${theme.b_low} !important}
#player .gage .value .unit { color:${theme.b_low} !important}
#player .gage .progress { background:${theme.b_low} !important }
#tips { color: ${theme.b_low} !important }
#tips .key { color: ${theme.b_high} !important }

/* EXTRAS*/
#player .gage.health .progress .bar { background:${theme.b_inv} !important  }
#player .gage.shield .progress .bar { background:${theme.b_high} !important  }
#player .gage.experience .progress .bar { background:${theme.b_med} !important  }
#table card .shortcut { color:${theme.background} !important}

`;

    this.el.innerHTML = html;
    this.save();
  }

  this.reset = function()
  {
    console.log("Theme","reset");
    this.install(this.default);
  }

  function is_json(text)
  {
    try{
      JSON.parse(text);
      return true;
    }
    catch (error){
      return false;
    }
  }
}