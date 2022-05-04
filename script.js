const DEFAULT_URL = "https://suanmeiguo.github.io/home-with-comments"
const DEFAULT_ID = "index"
const DEFAULT_TITLE = "Home with Comments";
const DEFAULT_LANG = "en";

function loadURL() {
  var url = document.getElementById("redfin_url").value;
  var msg = "", msg_cls = "row alert "; // need space at the end
  var is_match = url.match(/redfin\.com\/(.*?)\/(.*?)\/(.*?)\/home\/(\d*)/);
  if (is_match == null) {
    // reset when url is cleared
    if (url == "") {
      DISQUS.reset({
        reload: true,
        config: function (){
          this.page.url = DEFAULT_URL;
          this.page.identifier = DEFAULT_ID;
          this.page.title = DEFAULT_TITLE;
          this.page.language = DEFAULT_LANG;
        }
      })
    } else {
      msg = "Invalid URL format", msg_cls += "alert-danger"
    }
  } else {
    var canonical_url = "https://" + is_match[0].toLowerCase();
    var street = is_match[3], city = is_match[2], state = is_match[1], redfin_id = is_match[4];
    var unit = street.split("/")[1], street = street.split("/")[0];
    var address = street + (unit ? " " + unit : "") + ", " + is_match[2] + " " + is_match[1];
    msg = address.replaceAll("-", " "), msg_cls += "alert-success";
    console.log("load", redfin_id, canonical_url);
    DISQUS.reset({
      reload: true,
      config: function () {  
        this.page.identifier = redfin_id;
        this.page.url = canonical_url;
        this.page.title = address;
        this.language = "en";
      }
    });
  }
  var msg_ele = document.getElementById("msg");
  msg_ele.setAttribute("class", msg_cls);
  msg_ele.innerHTML = msg;
}

// For dev, if loading locally, use http file
if (window.location.href.startsWith("https://")) {
  var embed_src = "https://home-with-comments.disqus.com/embed.js";
} else {
  var embed_src = "http://home-with-comments.disqus.com/embed.js";
}

/**
*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables  */
var disqus_config = function () {
  this.page.url = DEFAULT_URL;
  this.page.identifier = DEFAULT_ID;
  this.page.title = DEFAULT_TITLE;
  this.page.language = DEFAULT_LANG;
};
// DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement("script");
s.src = embed_src;
s.setAttribute("data-timestamp", + new Date());
(d.head || d.body).appendChild(s);