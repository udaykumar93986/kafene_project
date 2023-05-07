$(document).ready(function () {
    if(localStorage.getItem('loginstatus') !== 'true'){
        location.assign('./index.html')
    }
    const logoutButton = document.getElementById('logout');
    logoutButton.onclick = function (e) {
        e.preventDefault();
        localStorage.setItem('loginstatus', false)
        location.assign('./index.html')
    }
    $.get("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
        function (data) {           
            data.map((item,pos) => {
                createRows(item)              
            })
            searchFun();
            $('#resetbtn').click(function (e) { 
                e.preventDefault();
                $('#searchbox').val('');
                $('#table_body tr').css('display','')
            });
        },
    );
    function createRows(data) {
        let tr = (`
        <tr class="table-row">
            <td class="secondary-text">${data.id}</td>
            <td class="secondary-text"><img src=${data.profilePic}/></td>
            <td class="secondary-text">${data.fullName}</td>
            <td class="primary-text">${data.dob}</td>
            <td class="secondary-text">${data.gender}</td>
            <td class="secondary-text">${data.currentCity}, ${data.currentCountry}</td>
        </tr>`)
        $('#table_body').append(tr);
    }


    const searchFun = () => {
        $('#search_form').submit((e) => {
            let searchValue = document.getElementById('searchbox').value.toUpperCase();
            e.preventDefault();
            if (searchValue.length < 2) {
                alert('Please enter atleast 2 characters');
                $('#table_body tr').css('display','')
            } else {
                $.get(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${searchValue}`,
                    function (data, textStatus, jqXHR) {

                        let tablebody = document.getElementById('table_body');
                        let tr = tablebody.getElementsByTagName('tr');
                        for (let i = 0; i < tr.length; i++) {
                            let td = tr[i].getElementsByTagName('td')[2];
                            if (td) {
                                let textValue = td.textContent || td.innerHTML;

                                if (textValue.toUpperCase().indexOf(searchValue) > -1) {
                                    tr[i].style.display = "";
                                } else {
                                    tr[i].style.display = 'none';
                                }
                            }
                        }
                    },
                );
            }
        })
    }
});
