PARALLAX JS
===========

This project has objective provide a library that allows the exhibition of web pages as "slide", in the parallax style

Rapidly and easily, following a tutorial very simple, will be possible turn your HTML page into "slides parallax"

HTML structure, in your body, use:

Obs: Each slide must stay into divs with the parallax class

	<section id="your-id-wrapper-here">
		<div class="parallax">
			<h2>First Slide!</h2>
			<img src="http://placehold.it/500x500?text=First+Slide!" />
		</div>
		<div class="parallax">
			<h2>Second Slide!</h2>
			<img src="http://placehold.it/500x500?text=Second+Slide!" />
		</div>
		<div class="parallax">
			<h2>Third Slide!</h2>
			<img src="http://placehold.it/500x500?text=Third+Slide!" />
		</div>
		<div class="parallax">
			<h2>Fourth Slide!</h2>
			<img src="http://placehold.it/500x500?text=Fourth+Slide!" />
		</div>
		<div class="parallax">
			<h2>Fifth Slide!</h2>
			<img src="http://placehold.it/500x500?text=Fifth+Slide!" />
		</div>
	</section>


Add the CSS and the JS of the parallax:
	
	<link type="text/css" rel="stylesheet" href="css/parallax-scroll.css" />
	<script type="text/javascript" src="js/parallax-scroll.js"></script>



Now is just begin the parallax:

	<script type="text/javascript">
		window.onload = function(){
			var parallax = new Parallax();
			parallax.init({
				wrapper: 'your-id-wrapper-here'
			});
		}
	</script>


The parallax don't depends of any external library as Jquery or similars.

The demo page is in [a link](http://bertoni.github.io/parallax/)
