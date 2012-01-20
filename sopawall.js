//     sopawall.js
//     (c) 2012 Carlo Zapponi
//     Use it, change it, modify it...do whatever you want with this piece of code
(function(){
		try {
			window.sopaWallCreateTweets=function(tweets){
				sopa.setTweets(tweets);
			}
		
			function Sopa(){
			
				var data={
					tweets:{},
					t:1
				},
				sopa={},
				sopastyle="#sopawall{z-index:9999;position:absolute;top:0;left:0;right:0;min-height:50px;}#sopawall a{line-height:46px;background-color:#000;color:#000;height:26px;font-size:18px;font-family:Georgia,serif;text-decoration:none;-webkit-transition:background .5s ease-out;-moz-transition:background .5s ease-out;-o-transition:background .5s ease-out;transition:background .5s ease-out;margin:0;padding:10px;}#sopawall a:hover{color:#fff;text-decoration:underline;}#sopawall a.last-child,#sopawall a.last-child:hover{background-color:#fff;color:#000;}#sopawall a.top{position:absolute;top:0;display:block;text-decoration:none;background-color:#fff;z-index:9999;font-size:12px;line-height:14px;height:auto;padding:4px 8px;}#sopawall a.top:hover{text-decoration:underline;color:#00aeff;}#sopawall #closesopa{right:5px;}#sopawall #sopatwitter{right:95px;}#sopawall #sopalink{right:160px;}";

				this.setTweets=function(tweets) {
					data.tweets=tweets;
					loop();
				};
			
				function addTweet() {
					if(data.tweets.length) {
						var tweet=data.tweets.pop(),
							t="@"+tweet.user+" "+tweet.txt,
							spans=sopa.children,
							l=spans.length;
						if(l && spans[l-1].className!="top") spans[l-1].className="";

						var newa=document.createElement("a");
						newa.href="https://twitter.com/#!/"+tweet.user+"/status/"+tweet.s;
						newa.target="_blank";
						newa.className="last-child";
						newa.innerHTML=t;
						sopa.appendChild(newa);

					}
				}
			
				function loop() {
					addTweet();
					if(data.t) data.t=setTimeout(loop,2000);
				}
			
				;(function init(){
					
					var body=document.getElementsByTagName("body")[0],
						cssNode = document.createElement('style'),
						sopalink=document.createElement("a"),
						twitter=document.createElement("a"),
						close=document.createElement("a");
						
					cssNode.type = 'text/css';
					cssNode.rel = 'stylesheet';
					cssNode.media = 'screen';
					cssNode.innerHTML=sopastyle;
					body.appendChild(cssNode);
					
					
					sopa=document.createElement("div");
					sopa.id="sopawall";
					body.appendChild(sopa);
					
					sopalink.id="sopalink";
					sopalink.className="top";
					sopalink.href="https://github.com/littleark/SOPA-WALL";
					sopalink.innerHTML="SOPA WALL";
					sopalink.target="blank_";
					sopa.appendChild(sopalink);

					twitter.id="sopatwitter";
					twitter.className="top";
					twitter.href="https://twitter.com/intent/tweet?hashtags=SOPA&original_referer="+(encodeURI(location.href))+"&source=tweetbutton&text="+(encodeURI(location.href+" has been auto-censored with SOPA WALL. Say no to SOPA and PIPA"))+"&url="+(encodeURI("https://github.com/littleark/SOPA-WALL"))+"&via=littleark";
					twitter.innerHTML="tweet me!";
					twitter.target="blank_";
					sopa.appendChild(twitter);
				
					close.id="closesopa";
					close.className="top";
					close.href="#";
					close.innerHTML="close sopa wall";
					if(!close.addEventListener) {
						close.onclick=function(){clearTimeout(data.t);data.t=false;body.removeChild(sopa);sopa={};return false;}
					} else {
						close.addEventListener("click", function(e){e.preventDefault();clearTimeout(data.t);data.t=false;body.removeChild(sopa);sopa={};return false;}, false);
					}
					sopa.appendChild(close);
					
					var jsonp=document.createElement("script");
					jsonp.setAttribute("type", "text/javascript")
					jsonp.src="http://www.makinguse.com/sopawall/getTweets.php";
					body.appendChild(jsonp);
				
				}());
			}
		
			var sopa=new Sopa();
		} catch(e) {}
}());