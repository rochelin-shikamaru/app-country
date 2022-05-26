
const handleMode = ()=>{
    const headingMode = document.querySelector(".heading__mode");
    headingMode.classList.toggle('active');

    if(headingMode.classList.contains("active")){
        headingMode.children[0].style.display = "none";
        headingMode.children[1].style.display = "block";
        document.querySelector("body").classList.add("moonLight");
    }
    else{
        headingMode.children[0].style.display = "block";
        headingMode.children[1].style.display = "none";
        document.querySelector("body").classList.remove("moonLight");

    }
   
}

const handleShow = ()=>{
    document.querySelector(".categorie__handle").classList.toggle("active");

    if(document.querySelector(".categorie__handle").classList.contains("active")){
        document.querySelector("ul").style.display = "block";
    }
    else{
        document.querySelector("ul").style.display = "none";
    }
}

const handleSelect = ()=>{
    const li = document.querySelectorAll("li");
    let newData = [];
    li.forEach(item =>{
        item.addEventListener('click', ()=>{
            document.querySelector(".categorie__handle span").innerText = item.innerText;

            for(let i = 0; i < document.querySelector(".gridContainer").children.length; i++){

                document.querySelector("ul").style.display = "none";
                document.querySelector(".categorie__handle").classList.remove("active");
                document.querySelector(".gridContainer").children[i].style.display = "none";
            }

            switch(document.querySelector(".categorie__handle span").innerText){
                case "Africa":
                    newData = data.filter(item => item.region == "Africa");
                break;
                case "Americas":
                    newData = data.filter(item => item.region == "Americas");
                break;
                case "Asia":
                    newData = data.filter(item => item.region == "Asia");
                break;
                case "Europe":
                    newData = data.filter(item => item.region == "Europe");
                break;
                default:
                    newData = data.filter(item => item.region == "Oceania");
                break;
            }

            showUser(newData);
        })
    })
}
handleSelect();

// fecth data
let data = [];
const fetchData = async ()=>{
    const response = await fetch("https://restcountries.com/v2/all");
    data = await response.json();
    document.querySelector(".preloader").style.display = "none";
    showUser(data);
    
}
fetchData().catch(e => console.log(e));

// 
const showUser = (data) =>{
    data.map(item =>{
        const div = document.createElement("div");
            div.classList.add("container");
            div.innerHTML = `<div class="container__img">
                                <img alt=${item.name} src=${item.flags.png} onclick="openLightBox(event)">
                            </div>
                            <div class="container__information">
                                <h3>${item.name}</h3>
                                <p> <span class="container__img--weight">Population:</span><span> ${numberSpace(item.population)}</span><br>
                                    <span class="container__img--weight">Region:</span><span> ${item.region}</span><br>
                                    <span class="container__img--weight">Capital:</span><span> ${item.capital}</span><br>
                                </p>

                            </div>
                            `;
            document.querySelector(".gridContainer").appendChild(div);
    })
}

document.querySelector("input").addEventListener('input', ()=>{
    const inputValue = document.querySelector("input").value;
    const newData = data.filter(item => item.name.toLowerCase().includes(inputValue.toLowerCase()));

    
    for(let i = 0; i < document.querySelector(".gridContainer").children.length; i++){
        document.querySelector(".gridContainer").children[i].style.display = "none";

    }
    
    showUser(newData);
})

// section lightBox

/// open lightbox
const openLightBox = (e)=>{
    const lightBox = document.querySelector(".lightBox");
    lightBox.style.display = "block";
    document.querySelector(".gridContainer").style.display = "none";
    const newData = data.filter(item => item.flags.png == e.target.src);

    if(newData[0].hasOwnProperty("borders")){
        const border = newData[0].borders;
        const borders = border.map(item => data.filter(el => el.alpha3Code == item)[0].name);

        for(let i = 0; i < document.querySelector(".borders").children.length; i++){
            document.querySelector(".borders").children[i].style.display = "none";
        }
     
        borderCountries(borders);
    }
    else{
        console.log("fuck you!!!!");
    }

    showCountry(newData); 
}

/// close the lightBox
const handleDisplayLightBox = ()=>{
    document.querySelector(".lightBox").style.display = "none";
    document.querySelector(".gridContainer").style.display = "grid";

}

/// information country in lightbox

const showCountry = (data)=>{
    data.map(item =>{
        const divImg = document.querySelector(".divImg");
        const gridLightBoxParagraphe = document.querySelector(".gridLightBox__paragraphe");

        divImg.innerHTML = `<img src=${item.flags.png} alt=${item.name}>`
        gridLightBoxParagraphe.innerHTML = `
                                        <p>
                                            <span class="lightBoxInformation lightBox--name">${item.name}</span><br>
                                            <span class="lightBoxInformation">Native Name:</span><span> ${item.nativeName}</span><br>
                                            <span class="lightBoxInformation">Population:</span><span> ${numberSpace(item.population)}</span><br>
                                            <span class="lightBoxInformation">Region:</span><span> ${item.region}</span><br>
                                            <span class="lightBoxInformation">Sub Region:</span><span> ${item.subregion}</span><br>
                                            <span class="lightBoxInformation">Capital:</span><span> ${item.capital}</span>
                                        </p>
                                        <p>
                                            <span class="lightBoxInformation">Top Level Domain:</span><span> ${item.topLevelDomain[0]}</span><br>
                                            <span class="lightBoxInformation">Currencies:</span><span> ${item.currencies[0].name}</span><br>
                                            <span class="lightBoxInformation">Languages:</span><span> ${item.languages.map(item => item.name).join(",")}</span><br>
                                        </p>
    
                                       `
    })
}

/// function to create borders countries

const borderCountries = (border)=>{
    border.map(item =>{
        const span = document.createElement("span");
        span.classList.add("spanBorders");
        span.innerText = item;
        document.querySelector(".borders").appendChild(span);
    })
}

// function to space a number

const numberSpace = (number) =>{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
