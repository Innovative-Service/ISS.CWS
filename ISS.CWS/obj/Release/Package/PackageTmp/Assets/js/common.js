common = {
	changeDate : function(date) {
		location.href = '?date='+date;			
		return false;
	},
	
	filterPortfolio : function(ele) {
		var filter = $.trim(ele.html()).toLowerCase();
		
		$('#loading').show();
		setTimeout(function(){
			$('#loading').hide();
			
			$('#area_portfolio > div').hide();
			$('.'+filter).show();
			
			$('#area_filter a').removeClass('active');
			ele.addClass('active');
		}, 300);		
	}	
}

common.qcontact_form = function() {
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
			$("#result").html(result.err_msg);
			$("#result").show();
			
			setTimeout(function(){
	            $('#result').fadeOut('slow').remove();
	        }, 5000);
		}	        
    }
    return {
        changeSubject : changeSubject,
        clearQuickContactForm : clearForm
    }
}();

common.contact_page = function(){
    var email_regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    var sendButton, attachButton, data;
    var isSubmitting = false;
    function validate(){
        if (($.trim($("#email").val())=='')||(!email_regex.test($("#email").val())) ||$("#email").val()== $("#email").attr('title')) return false;
        if ($.trim($("#message").val())=='' ||$("#message").val()== $("#message").attr('title')) return false;
        if ($(":radio[name=subject]").filter(":checked").val()=='budget'&&$("#budget option:selected").val()=='0') return false
        if ($(":radio[name=subject]").filter(":checked").val()===undefined) return false;
        return true;
    };
    function popupMessage(params){
        $("#message-box").jAlert(params.message,params.type,params.cssClass, params.width);
        //hide the pop up after 3s
        setTimeout(function(){
            $('.msg-box-cont').fadeOut('slow').remove();
            common.contact_page.isSubmitting = false;
        }, 3000);
    }
    function submit(){    	
        if(!common.contact_page.isSubmitting){
        	$('#name').removeClass('error');
    		$('#email').removeClass('error');
    		$('#message').removeClass('error');
    		
            data = $('#contact-form').serialize();
            $.ajax({
                type: "POST",
                url: common.contact_page.url,
                data: data,
                dataType: 'json',
                beforeSend : function(){
                    common.contact_page.isSubmitting = true;
                    $("img#load").css('visibility','visible');
                },
                success: function(result){
                	if (result.err_code == 0) {                		                		
                		location.href = window.location.href + '?p=thanks';
                	} else {                		
                		$("img#load").css('visibility','hidden');
                		$('#'+result.id).addClass('error');
                		
                		popupMessage({
                            message : result.err_msg,
                            type : "fatal",
                            cssClass : 'widthcustom', 
                            width: 180
                		});
                	}                    	                    	
                }
            });     
        }                             
    };
    function registerAttachButton(){
        attachButton = $("#brws");
        $.ajax_upload(attachButton, {
            action : common.contact_page.url_upload,
            name : 'attachment',
            onSubmit : function(file, ext) {
                $("img#load").css('visibility','visible');
                $("#brws font").text('Uploading');
            },
            onComplete : function(file, response) {
                $("img#load").css('visibility','hidden');
                $('#brws').removeClass('hover');

                $("#attachment").val(file);
            }
        });
    };
    function registerSendButton(){
        sendButton = $("#sendForm");
        sendButton.click(function(event){               
            submit();            
        });
    };
    function registerEvents(){
        registerSendButton();
        registerAttachButton();
    };
    return {
        message : [],
        url : "",
        url_upload : "",        
        registerEvents : registerEvents
    }
}();

$(document).ready(function(){
	if ($('#my_date').length) {
		$('#my_date').datepicker({
			dateFormat: 'yy-mm-dd',
			onSelect: function(dateText, inst) {
				common.changeDate(dateText);
			}
		});
		
		$('#my_date').datepicker( "setDate" , $('#active_date').val() );
	}	
});
