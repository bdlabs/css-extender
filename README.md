# Css Extender!

This is a very small library for styles manipulation. Base extend is css aliases parser plugin.
How it's work?

## Example
For example we have  one DIV with class 'row' from bootstrap css and three columns inside this. 
Such a record tells us nothing, we do not know what it is.
But we will need to name this component for example product-list and any inside DIV product-list--product

     <div class="row">
        <div class="col-12 col-sm-6 col-lg-3">Product</div>
        <div class="col-12 col-sm-6 col-lg-3">Product</div>
        <div class="col-12 col-sm-6 col-lg-3">Product</div>
    </div>
    
To work!

    <div class="product-list row">
        <div class="product-list--product col-12 col-sm-6 col-lg-3">Product</div>
        <div class="product-list--product col-12 col-sm-6 col-lg-3">Product</div>
        <div class="product-list--product col-12 col-sm-6 col-lg-3">Product</div>
    </div>
    
It's better now because we can know what a component is, but it's not a good look.
To improve the record even better, we can use css aliases.

    <style>
        @aliases() {
            .moje-wyniki: "row";
            .moje-wyniki--record: "col-12 col-sm-6 col-lg-3 mx-md-n5";
            .moje-wyniki--record: "col-12 col-sm-6 col-lg-3 mx-md-n5";
        }
    </style>
    <body>
	    <div class="product-list">
	        <div class="product-list--product">Product</div>
	        <div class="product-list--product">Product</div>
	        <div class="product-list--product">Product</div>
	    </div>
    </body>
