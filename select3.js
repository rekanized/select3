function select3_addcss(){
    styles = `
        select3_selectcontainer {
            display: flex;
            position: relative;
            flex-direction: column;
        }
        select3_selectcontainer input[type="text"] {
            margin: 0px !important;
        }
        select3_searchlist {
            max-height: 40vh;
            overflow: auto;
            overflow-x: hidden;
            box-shadow: 0px 0px 3px 0px #868686;
            border-radius: 4px;
            background-color: white;
            position: fixed;
            z-index: 100;
        }
        select3_searchlist > div:first-child {
            padding: 8px 16px;
        }
        select3_searchlist > div {
            transition: all 0.2s ease;
            padding: 8px 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        select3_searchlist optiontext {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        select3_searchlist > div > input[type=checkbox] {
            transform: scale(1.2);
            margin-right: 8px;
        }
        select3_searchlist > div:hover {
            background-color: #ababab;
        }
        select3_showbutton {
            transition: transform 0.1s ease;
            text-align: center;
            display: none;
            cursor: pointer;
            right: 0;
            position: absolute;
            user-select: none;
            transform: rotate(-90deg);
            box-shadow: 0px -4px 4px -6px black;
        }
        .select3_open {
            transform: rotate(90deg);
        }
    `;
    let css = document.createElement('style');
    css.innerText = styles;
    document.head.appendChild(css);
}
select3_addcss();

function select3_livesearch(){
    let allSelects = document.querySelectorAll('.select3-livesearch');
    allSelects.forEach(element => {
        // Check so select is not already rendered
        if (element.classList.contains('rendered')){
            return;
        }
        element.classList.add('rendered');

        // Create the container
        let container = document.createElement('select3_selectcontainer');

        // Create show button
        let showButton = document.createElement('select3_showbutton');
        showButton.innerHTML = '&#10094;';
        showButton.style.display = "block";
        container.appendChild(showButton);
        
        // Insert the current dropdown into the main container that supports the dropdown system
        element.parentElement.insertBefore(container,element);
        container.appendChild(element);

        // Hide the normal dropdown and replace it.
        element.style.display = "none";
        let selector = document.createElement('input');
        let previousSelection = element.querySelector('option[selected="selected"]');
        if (previousSelection){
            selector.value = previousSelection.innerHTML;
        }
        selector.setAttribute('type','text');
        selector.setAttribute('readonly','readonly');
        selector.style.cursor = "pointer";
        selector.style.textOverflow = "ellipsis";
        selector.style.width = element.style.width;
        if (element.style.width){
            selector.style.minWidth = "auto";
            selector.style.maxWidth = "auto";
        }
        container.appendChild(selector);

        // Create the search "menu"
        let searchList = document.createElement('select3_searchlist');
        searchList.style.display = "none";
        let searchInput;
        searchInput = document.createElement('input');
        searchInput.setAttribute('type','text');
        searchInput.setAttribute('placeholder','Search...');
        searchList.appendChild(searchInput);

        // Search functions
        let options = element.querySelectorAll('option');
        searchInput.addEventListener("keyup",function(){
            let searchText = this.value;
            let optionsToSearch = searchList.querySelectorAll("div");
            optionsToSearch.forEach(option => {
                if (option.innerHTML.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 || option.getAttribute('value').toLowerCase().indexOf(searchText.toLowerCase()) !== -1){
                    option.style.display = "block";
                }
                else {
                    option.style.display = "none";
                }
            });
        });
        container.appendChild(searchList);
        
        // Clone the current options to the new dropdown
        options.forEach(option => {
            let newOption = document.createElement('div');
            newOption.setAttribute('value',option.value);
            let optionText = document.createElement('optiontext');
            optionText.appendChild(document.createTextNode(option.innerHTML));
            newOption.appendChild(optionText);
            searchList.appendChild(newOption);
            newOption.addEventListener("click",function(){
                options.forEach(optionRemoveSelect => {
                    optionRemoveSelect.removeAttribute('selected');
                });
                selector.value = option.innerHTML;
                searchInput.value = "";
                searchList.querySelectorAll("div").forEach(element => {
                    element.style.display = "block";
                });
                element.querySelector("option[value='"+option.value+"']").setAttribute('selected','selected');
                hideSearchlist();
            });
        });

        // viewToggle Button fix for them so the can dynamically change based on how large the select is
        let buttonsFixAmount = (selector.offsetHeight + selector.style.paddingTop);
        showButton.style.width = (buttonsFixAmount)+"px";
        showButton.style.lineHeight = (buttonsFixAmount)+"px";
        selector.style.paddingRight = (buttonsFixAmount)+"px";

        if (element.getAttribute('disabled')){
            selector.setAttribute('disabled','true');
            return;
        }

        showButton.addEventListener("click",showSearchlist);
        selector.addEventListener("click",showSearchlist);
        container.addEventListener("mouseleave",hideSearchlist);

        function showSearchlist(){
            showButton.classList.add('select3_open');
            searchList.style.marginTop = selector.offsetHeight;
            searchList.style.width = selector.offsetWidth;
            searchInput.style.width = selector.offsetWidth;
            searchList.style.display = "block";
            showButton.removeEventListener("click",showSearchlist);
            showButton.addEventListener("click",hideSearchlist);
        }

        function hideSearchlist(){
            showButton.classList.remove('select3_open');
            searchList.style.display = "none";
            showButton.addEventListener("click",showSearchlist);
        }
    });
}

function select3(){
    let allSelects = document.querySelectorAll('.select3');
    allSelects.forEach(element => {
        // Check so select is not already rendered
        if (element.classList.contains('rendered')){
            return;
        }
        element.classList.add('rendered');

        // Create the container
        let container = document.createElement('select3_selectcontainer');

        // Create show button
        let showButton = document.createElement('select3_showbutton');
        showButton.innerHTML = '&#10094;';
        showButton.style.display = "block";
        container.appendChild(showButton);
        
        // Insert the current dropdown into the main container that supports the dropdown system
        element.parentElement.insertBefore(container,element);
        container.appendChild(element);

        // Hide the normal dropdown and replace it.
        element.style.display = "none";
        let selector = document.createElement('input');
        let previousSelection = element.querySelector('option[selected="selected"]');
        if (previousSelection){
            selector.value = previousSelection.innerHTML;
        }
        selector.setAttribute('type','text');
        selector.setAttribute('readonly','readonly');
        selector.style.cursor = "pointer";
        selector.style.textOverflow = "ellipsis";
        selector.style.width = element.style.width;
        if (element.style.width){
            selector.style.minWidth = "auto";
            selector.style.maxWidth = "auto";
        }
        container.appendChild(selector);

        // Create the search "menu"
        let searchList = document.createElement('select3_searchlist');
        searchList.style.display = "none";
        searchList.style.width = selector.offsetWidth;
        container.appendChild(searchList);
        
        // Clone the current options to the new dropdown
        let options = element.querySelectorAll('option');
        options.forEach(option => {
            //let newOption = option.cloneNode(true);
            let newOption = document.createElement('div');
            newOption.setAttribute('value',option.value);
            let optionText = document.createElement('optiontext');
            optionText.appendChild(document.createTextNode(option.innerHTML));
            newOption.appendChild(optionText);
            searchList.appendChild(newOption);
            newOption.addEventListener("click",function(){
                options.forEach(optionRemoveSelect => {
                    optionRemoveSelect.removeAttribute('selected');
                });
                selector.value = option.innerHTML;
                element.querySelector("option[value='"+option.value+"']").setAttribute('selected','selected');

                // create a fake event to trigger change when we change something
                var event = new Event('change', {
                    bubbles: true,
                    cancelable: true
                });
                element.dispatchEvent(event);

                hideSearchlist();
            });
        });

        // viewToggle Button fix for them so the can dynamically change based on how large the select is
        let buttonsFixAmount = (selector.offsetHeight + selector.style.paddingTop);
        showButton.style.width = (buttonsFixAmount)+"px";
        showButton.style.lineHeight = (buttonsFixAmount)+"px";
        selector.style.paddingRight = (buttonsFixAmount)+"px";

        if (element.getAttribute('disabled')){
            selector.setAttribute('disabled','true');
            return;
        }

        showButton.addEventListener("click",showSearchlist);
        selector.addEventListener("click",showSearchlist);
        container.addEventListener("mouseleave",hideSearchlist);

        function showSearchlist(){
            showButton.classList.add('select3_open');
            searchList.style.marginTop = selector.offsetHeight;
            searchList.style.width = selector.offsetWidth;
            searchList.style.display = "block";
            showButton.removeEventListener("click",showSearchlist);
            showButton.addEventListener("click",hideSearchlist);
        }

        function hideSearchlist(){
            showButton.classList.remove('select3_open');
            searchList.style.display = "none";
            showButton.addEventListener("click",showSearchlist);
        }
    });
}

function select3_multiselect(){
    let allSelects = document.querySelectorAll('.select3-multiselect');
    allSelects.forEach(element => {
        // Check so select is not already rendered
        if (element.classList.contains('rendered')){
            return;
        }
        element.classList.add('rendered');

        // Create the container
        let container = document.createElement('select3_selectcontainer');

        // Create the show button
        let showButton = document.createElement('select3_showbutton');
        showButton.innerHTML = '&#10094;';
        showButton.style.display = "block";
        container.appendChild(showButton);
        
        // Insert the current dropdown into the main container that supports the dropdown system
        element.parentElement.insertBefore(container,element);
        container.appendChild(element);

        // Hide the normal dropdown and replace it.
        element.style.display = "none";
        let selector = document.createElement('input');
        let previousSelection = element.querySelector('option[selected="selected"]');
        if (previousSelection){
            selector.value = previousSelection.innerHTML;
        }
        selector.setAttribute('type','text');
        selector.setAttribute('readonly','readonly');
        selector.style.cursor = "pointer";
        selector.style.textOverflow = "ellipsis";
        selector.style.width = element.style.width;
        if (element.style.width){
            selector.style.minWidth = "auto";
            selector.style.maxWidth = "auto";
        }
        container.appendChild(selector);

        // Create the search "menu"
        let searchList = document.createElement('select3_searchlist');
        searchList.style.display = "none";
        searchList.style.width = selector.offsetWidth;
        container.appendChild(searchList);
        
        // Clone the current options to the new dropdown
        let options = element.querySelectorAll('option');
        options.forEach(option => {
            let newOption = document.createElement('div');
            newOption.setAttribute('value',option.value);
            let checkbox = document.createElement('input');
            checkbox.setAttribute('type','checkbox');
            newOption.appendChild(checkbox);
            let optionText = document.createElement('optiontext');
            optionText.appendChild(document.createTextNode(option.innerHTML));
            newOption.appendChild(optionText);
            searchList.appendChild(newOption);
            checkbox.addEventListener("click",function(){
                this.checked = !this.checked;
            });
            newOption.addEventListener("click",function(){
                let checkboxObject = this.querySelector('input[type="checkbox"]');
                checkboxObject.checked = !checkboxObject.checked;
                allCheckboxes = searchList.querySelectorAll('input[type="checkbox"]');
                let inputValues = [];
                allCheckboxes.forEach(checkboxValue => {
                    if (checkboxValue.checked){
                        inputValues.push(checkboxValue.parentElement.innerText);
                    }
                });
                selector.value = inputValues.join(', ');
                let replacementOption = document.createElement('option');
                replacementOption.value = '["'+inputValues.join('","')+'"]';;
                replacementOption.setAttribute('selected','selected');
                element.appendChild(replacementOption);
            });
            options.forEach(optionObject => {
                optionObject.remove();
            });
        });

        // viewToggle Button fix for them so the can dynamically change based on how large the select is
        let buttonsFixAmount = (selector.offsetHeight + selector.style.paddingTop);
        showButton.style.width = (buttonsFixAmount)+"px";
        showButton.style.lineHeight = (buttonsFixAmount)+"px";
        selector.style.paddingRight = (buttonsFixAmount)+"px";
        
        if (element.getAttribute('disabled')){
            selector.setAttribute('disabled','true');
            return;
        }

        showButton.addEventListener("click",showSearchlist);
        selector.addEventListener("click",showSearchlist);
        container.addEventListener("mouseleave",hideSearchlist);

        function showSearchlist(){
            showButton.classList.add('select3_open');
            searchList.style.marginTop = selector.offsetHeight;
            searchList.style.width = selector.offsetWidth;
            searchList.style.display = "block";
            showButton.removeEventListener("click",showSearchlist);
            showButton.addEventListener("click",hideSearchlist);
        }

        function hideSearchlist(){
            showButton.classList.remove('select3_open');
            searchList.style.display = "none";
            showButton.addEventListener("click",showSearchlist);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    select3_livesearch();
    select3_multiselect();
    select3();
});
