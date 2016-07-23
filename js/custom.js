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
	},
	showAdminArea: function(adminArea){
		adminArea.style.display="block";
	},
	hideAdminArea: function(adminArea){
		adminArea.style.display="none";
	},
	clearInputValues: function(nameInput,countInput){
		nameInput.value='';
		countInput.value='';
	},
	cancle: function(nameInput,countInput,adminArea){
		this.clearInputValues(nameInput,countInput);
		this.hideAdminArea(adminArea);
	},
	validation: function(nameInput,countInput){
		if (nameInput.value == null || nameInput.value == "") {
	        alert("Name must be filled out");
	        return false;
	    }
		if (isNaN(countInput.value) || countInput.value < 0 || countInput.value=="") {
	        alert("count must be number and must be greater than 0");
	        return false;
	    } 
	    return true;
	},
	toggleView: function(nameInput,countInput,adminArea){
		if(adminArea.style.display=="block"){
			this.cancle(nameInput,countInput,adminArea);
		}else{
			this.showAdminArea(adminArea);
		}
	},
	chaneValue: function(nameInput,countInput,adminArea){
		if(this.validation(nameInput,countInput)){
			model.currentCat.count=countInput.value;
			model.currentCat.name=nameInput.value;
			catView.render();
			catListView.render();
			this.clearInputValues(nameInput,countInput);
			this.hideAdminArea(adminArea);
		}
		
	}
};

//=======view========//
var catView = {
	//geting dom objects
	init: function(){
		this.nameLable=document.getElementById('catName');
		this.countLable=document.getElementById('catCount');
		this.catImg=document.getElementById('catImg');
		this.cancleBt=document.getElementById('cancle');
		this.submitBt=document.getElementById('submit');
		this.adminBt=document.getElementById('admin');
		this.adminArea=document.getElementById('adminArea');
		this.nameInput=document.getElementById('adminArea');
		this.countInput=document.getElementById('adminArea');
		 // on click, increment the current cat's counter
        this.catImg.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        //on click, show admin area
        this.adminBt.addEventListener('click',function(){
        	octopus.toggleView(nameInput,countInput,adminArea);
        });

        //onclick change cat name and count
        this.submitBt.addEventListener('click',function(){
        	octopus.chaneValue(nameInput,countInput,adminArea);
        });

        //on click clear input values and hide admin area
        this.cancleBt.addEventListener('click',function(){
        	octopus.cancle(nameInput,countInput,adminArea);
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
		while (this.catNameList.hasChildNodes()) {   
		    this.catNameList.removeChild(this.catNameList.firstChild);
		}
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



