//=======model=======//
var model={
	currentCat:null,
	init: function(){
		//creating data for cat list
	 	this.catNames = ['Tom','Luccy','Pussy','Rug','Bill'];
		this.catsList=[]; //final list having cat objects
		for(var i=0;i<5;i++){
			var cat={};
			cat.name=this.catNames[i];
			cat.count=0;
			cat.index=i;
			var imgPath='img/cat' + (i+1) + '.jpg'
			cat.img=imgPath;
			this.catsList.push(cat);
		}
	}
};

//=========octopus======//
var octopus={
	init:function(){
		model.init();
		model.currentCat=model.catsList[0];
		catListView.init();
		catView.init();
	},
	incrementCounter: function(){
		model.currentCat.count++;
		catView.render();
	},
	getCat:function(){
		return model.currentCat;
	},
	getCats: function(){
		return model.catsList;
	},
	setCurrentCat: function(cat){
		model.currentCat=cat;
	}
};

//=======view========//
var catView = {
	//geting dom objects
	init: function(){
		this.nameLable=document.getElementById('catName');
		this.countLable=document.getElementById('catCount');
		this.catImg=document.getElementById('catImg');

		 // on click, increment the current cat's counter
        this.catImg.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        this.render();
		
	},
	render: function(){
		var cat=octopus.getCat();
		this.nameLable.innerHTML=cat.name;
		this.catImg.src=cat.img;
		this.catImg.id=cat.index;
		this.countLable.innerHTML=cat.count;
	}
};

var catListView={
	init: function(){
		// Add the contents of options[0] to #foo:
		this.catNameList=document.getElementById('catList');
		
		this.render();
	},
	render: function(){
		var list = document.createElement('ul');
		var cats = octopus.getCats();
	    for(var i = 0; i < cats.length; i++) {
	        // Create the list item:
	        var item = document.createElement('li');

	        // Set its contents:
	        item.appendChild(document.createTextNode(cats[i].name));

	        //add click event listner
	        item.addEventListener('click',(function(catCopy){
	        	return function() {
			        octopus.setCurrentCat(catCopy);
			        catView.render();
			    };
	        })(cats[i]),false);

	        // Add it to the list:
	        list.appendChild(item);
	    }
	    this.catNameList.appendChild(list);
	}
};

octopus.init();



