function select3(){
    let allSelects = document.querySelectorAll('.select3');
    allSelects.forEach(element => {
        if (element.classList.contains('rendered')){
            return;
        }
        element.classList.add('rendered');
        let container = document.createElement('select3_selectcontainer');
        element.parentElement.insertBefore(container,element);
        container.appendChild(element);
        element.style.display = "none";
        let selector = document.createElement('input');
        selector.setAttribute('type','text');
        selector.style.cursor = "pointer";
        selector.setAttribute('readonly','readonly');
        container.appendChild(selector);
        let searchList = document.createElement('select3_searchlist');
        searchList.style.display = "none";
        let options = element.querySelectorAll('option');
        let searchInput = document.createElement('input');
        searchInput.setAttribute('type','text');
        searchInput.setAttribute('placeholder','Search');
        searchList.appendChild(searchInput);
        container.appendChild(searchList);
        options.forEach(option => {
            let newOption = option.cloneNode(true);
            searchList.appendChild(newOption);
            newOption.addEventListener("click",function(){
                options.forEach(optionRemoveSelect => {
                    optionRemoveSelect.removeAttribute('selected');
                });
                selector.value = option.value;
                element.querySelector("option[value='"+option.value+"']").setAttribute('selected','selected');
                searchList.style.display = "none";
            });
        });
        container.appendChild(searchList);
        selector.addEventListener("click",function(){
            searchList.style.display = "block";
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    select3();
});
