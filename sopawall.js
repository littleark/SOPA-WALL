	;(function(){
		
		window.createTweets=function(tweets){
			sopa.setTweets(tweets);
		}
		
		var sopastyle="#sopawall{z-index:9999;position:absolute;top:0;left:0;right:0;min-height:50px;}#sopawall a{line-height:46px;background-color:#000;color:#000;height:26px;font-size:18px;font-family:Georgia,serif;text-decoration:none;-webkit-transition:background .5s ease-out;-moz-transition:background .5s ease-out;-o-transition:background .5s ease-out;transition:background .5s ease-out;margin:0;padding:10px;}#sopawall a:hover{color:#fff;text-decoration:underline;}#sopawall a.last-child,#sopawall a.last-child:hover{background-color:#fff;color:#000;}#sopawall a.top{position:absolute;top:0;display:block;text-decoration:none;background-color:#333;z-index:9999;font-size:14px;line-height:14px;height:auto;-moz-border-radius-topleft:0;-moz-border-radius-topright:0;-moz-border-radius-bottomright:5px;-moz-border-radius-bottomleft:5px;-webkit-border-radius:0 0 5px 5px;border-radius:0 0 5px 5px;padding:4px;}#sopawall a.top:hover{text-decoration:underline;}#sopawall #closesopa{color:#ffff00;right:5px;}#sopawall #sopatwitter{color:#00fffa;right:110px;}";
		var sopadom="<style type=\"text/css\" media=\"screen\">"+sopastyle+"</style><div id=\"sopawall\"></div>";
		
		function Sopa(){
			
			var data={
				last:new Date().getTime(),
				tweets:{},
				t:1
			};
			
			var sopa={};

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
				var body=document.getElementsByTagName("body")[0];
				body.innerHTML=body.innerHTML+sopadom;
				sopa=document.getElementById("sopawall");
				
				var twitter=document.createElement("a");
				twitter.id="sopatwitter";
				twitter.className="top";
				twitter.href="https://twitter.com/intent/tweet?hashtags=SOPA&original_referer="+(encodeURI(location.href))+"&source=tweetbutton&text="+(encodeURI("SOPA Wall - Auto-censor your website through tweets against SOPA. Say no to SOPA and PIPA"))+"&url="+(encodeURI("https://github.com/littleark/SOPA-WALL"))+"&via=littleark";
				twitter.innerHTML="tweet me!";
				twitter.target="blank_";
				sopa.appendChild(twitter);
				
				var close=document.createElement("a");
				close.id="closesopa";
				close.className="top";
				close.href="#";
				close.innerHTML="close sopa wall";
				close.addEventListener("click", function(e){e.preventDefault();clearTimeout(data.t);data.t=false;body.removeChild(sopa);sopa={};return false;}, false);
				sopa.appendChild(close);
				
				var jsonp=document.createElement("script");
				jsonp.setAttribute("type", "text/javascript")
				jsonp.src="http://www.makinguse.com/sopawall/getTweets.php";
				body.appendChild(jsonp);
				
				//loop();
				
			}());
		}
		
		var sopa=new Sopa();
		
	}());