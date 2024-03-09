function select3(setting){
    let allSelects = document.querySelectorAll('.select3');
    allSelects.forEach(element => {
        if (element.classList.contains('rendered')){
            return;
        }
        element.classList.add('rendered');
        let container = document.createElement('select3_selectcontainer');
        container.style.position = "relative";
        let hideButton = document.createElement('select3_hidebutton');
        let showButton = document.createElement('select3_showbutton');
        showButton.innerHTML = '&#10094;';
        hideButton.innerHTML = '&#10006;';
        hideButton.style.display = "none";
        showButton.style.display = "block";
        container.appendChild(hideButton);
        container.appendChild(showButton);
        element.parentElement.insertBefore(container,element);
        container.appendChild(element);
        element.style.display = "none";
        let selector = document.createElement('input');
        let previousSelection = element.querySelector('option[selected="selected"]');
        if (previousSelection){
            selector.value = previousSelection.innerHTML;
        }
        selector.setAttribute('type','text');
        selector.style.cursor = "pointer";
        selector.setAttribute('readonly','readonly');
        selector.style.textOverflow = "ellipsis";
        container.appendChild(selector);
        let searchList = document.createElement('select3_searchlist');
        searchList.style.display = "none";
        let options = element.querySelectorAll('option');
        let searchInput;
        if (setting == 'live'){
            searchInput = document.createElement('input');
            searchInput.setAttribute('type','text');
            searchInput.setAttribute('placeholder','Search...');
            searchList.appendChild(searchInput);
            searchInput.addEventListener("keyup",function(){
                let searchText = this.value;
                let optionsToSearch = searchList.querySelectorAll("option");
                optionsToSearch.forEach(option => {
                    if (option.innerHTML.toLowerCase().indexOf(searchText.toLowerCase()) !== -1){
                        option.style.display = "block";
                    }
                    else {
                        option.style.display = "none";
                    }
                });
            });
        }
        container.appendChild(searchList);
        searchList.style.width = selector.offsetWidth;
        searchList.style.position = "absolute";
        searchList.style.zIndex = "100";
        options.forEach(option => {
            let newOption = option.cloneNode(true);
            searchList.appendChild(newOption);
            newOption.addEventListener("click",function(){
                options.forEach(optionRemoveSelect => {
                    optionRemoveSelect.removeAttribute('selected');
                });
                selector.value = option.innerHTML;
                if (setting == 'live'){ searchInput.value = ""; }
                searchList.querySelectorAll("option").forEach(element => {
                    element.style.display = "block";
                });
                element.querySelector("option[value='"+option.value+"']").setAttribute('selected','selected');
                hideButtonToggle();
            });
        });
        let buttonsFixAmount = (selector.offsetHeight + selector.style.paddingTop);
        hideButton.style.height = (buttonsFixAmount)+"px";
        hideButton.style.lineHeight = (buttonsFixAmount)+"px";
        showButton.style.height = (buttonsFixAmount)+"px";
        showButton.style.lineHeight = (buttonsFixAmount)+"px";
        hideButton.addEventListener("click",hideButtonToggle);
        showButton.addEventListener("click",hideButtonToggle);
        container.appendChild(searchList);
        selector.addEventListener("click",hideButtonToggle);

        function hideButtonToggle(){
            let run = hideButton.style.display == "none";
            document.querySelectorAll('select3_searchlist').forEach(element => {
                element.style.display = "none";
            });
            document.querySelectorAll('select3_hidebutton').forEach(element => {
                element.style.display = "none";
            });
            document.querySelectorAll('select3_showbutton').forEach(element => {
                element.style.display = "block";
            });
            if (run){
                searchList.style.display = "block";
                hideButton.style.display = "block";
                showButton.style.display = "none";
            }
            else {
                document.querySelectorAll('select3_searchlist').forEach(element => {
                    element.style.display = "none";
                });
                //searchList.style.display = "none";
                hideButton.style.display = "none";
                showButton.style.display = "block";
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    select3("live");
});
