'use strict';

document.getElementById('sortBy').addEventListener('change', function() {
    const form = document.getElementById('filterForm');
    form.submit();
});

function submitPagination(page) {
    const form = document.getElementById('filterForm');
    let pageInput = form.querySelector('input[name="page"]');
    if (!pageInput) {
        pageInput = document.createElement('input');
        pageInput.type = 'hidden';
        pageInput.name = 'page';
        form.appendChild(pageInput);
    }
    pageInput.value = page;



    form.submit();
}

function confirmDelete(button,lien) {
    var dataId = button.getAttribute('data-id');
    console.log(lien);

    Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Vous ne pourrez pas annuler cela!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        cancelButtonColor: "#9ec5fe",
        confirmButtonText: "Oui, supprimez-le!"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(lien + dataId, {
                method: 'GET'
            }).then(response => {
                if (response.ok) {
                    Swal.fire({
                        title: "Supprimé!",
                        text: "Votre catégorie a été supprimée.",
                        icon: "success"
                    }).then(() => {
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        title: "Erreur",
                        text: "La suppression a échoué.",
                        icon: "error"
                    });
                }
            });
        }
    });
}


