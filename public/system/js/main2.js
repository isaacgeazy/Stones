$(function(){
    $("#form-total").steps({
        headerTag: "h2",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        autoFocus: true,
        transitionEffectSpeed: 500,
        titleTemplate : '<div class="title">#title#</div>',
        labels: {
            previous : 'Back',
            next : 'Próximo',
            finish : 'Confirmar',
            current : ''
        },
        onStepChanging: function (event, currentIndex, newIndex) { 
            var fullname = $('#first_name').val() + ' ' + $('#last_name').val();
            var descrpition = $('#description').val();
            var mobra = $('#mobra').val();
            var valor = $('#valor').val();
            var vencimento = $('#vencimento').val();

            $('#fullname-val').text(fullname);
            $('#description-val').text(descrpition);
            $('#mobra-val').text(mobra);
            $('#valor-val').text(valor);
            $('#vence-val').text(vencimento);

            return true;
        }
    });
    $("#day").datepicker({
        dateFormat: "MM - DD - yy",
        showOn: "both",
        buttonText : '<i class="zmdi zmdi-chevron-down"></i>',
    
    });
});
