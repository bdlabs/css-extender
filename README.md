# Css Extender!

This is a very small library for styles manipulation. Base extend is css aliases parser plugin.
How it's work?

## Example
For exmaple we have  one DIV with class 'row' from bootstrap css and three columns inside this. 
Such a record tells us nothing, we do not know what it is.
But we will need nameing this component for example product-list and any inside DIV paroduct-list--product

     <div class="row">
        <div class="col-12 col-sm-6 col-lg-3">Product</div>
        <div class="col-12 col-sm-6 col-lg-3">Product</div>
        <div class="col-12 col-sm-6 col-lg-3">Product</div>
    </div>
To work!

    <div class="product-list row">
        <div class="paroduct-list--product col-12 col-sm-6 col-lg-3">Product</div>
        <div class="paroduct-list--product col-12 col-sm-6 col-lg-3">Product</div>
        <div class="paroduct-list--product col-12 col-sm-6 col-lg-3">Product</div>
    </div>
Better now, we can know what component it is, but this is not good look.
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
	        <div class="paroduct-list--product">Product</div>
	        <div class="paroduct-list--product">Product</div>
	        <div class="paroduct-list--product">Product</div>
	    </div>
    </body>
