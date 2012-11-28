elinext = {};

elinext.page = function() {
	function changeSubject() {
		if ($("input[@name='quick-contact-form[subject]']:checked").val() == 'quote') {
			$('#QuickContactForm_budget').slideDown("fast");
		} else {
			$('#QuickContactForm_budget').slideUp("fast");
		}		
	}
	function clearForm(result, option) {
		$('#QuickContactForm_name').removeClass('error');
		$('#QuickContactForm_email').removeClass('error');
		$('#QuickContactForm_message').removeClass('error');
		
		if (result.err_code == 0) {
			location.href = option.defaultValue.url + '/contact?p=thanks';
		} else {
			$('#loading_qcontact').hide();
			
			$('#QuickContactForm_'+result.id).addClass('error');
			$("#result").html(result.data);
			$("#result").show();
			$('#result').delay('5000').fadeOut('slow');
		}		
	 }
         /*
         * chanceColorInput: add Class dark when hover on the input / remove CLass when Blur
         * @ param: obj 			// this element 
         * @ param: defaultVal 		// default value of this element 
         *  
         */
        function chanceColorInput(obj, defaultVal) {
                var id = obj.getAttribute('id');
                if ($('#' + id).hasClass('dark') && $('#' + id).val() === defaultVal ) {
                        $('#' + id).removeClass('dark');	
                } else {
                        $('#' + id).addClass('dark');
                }	
        } // END CLASS 
	return {
                chanceColorInput : chanceColorInput,
		changeSubject : changeSubject,
		clearQuickContactForm : clearForm
	}
}();