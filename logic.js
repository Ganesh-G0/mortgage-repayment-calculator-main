$(document).ready(() => {    
  let repaymentValue;
  let interestValue;

  $(".radio-btn").click((e) => { 
    if (e.target.id === "repay") {
      $(".repay-group").addClass("active-radio-btn");
      $(".int-group").removeClass("active-radio-btn");
      repaymentValue = (mortgageCalculator("repay"));
      console.log(mortgageCalculator("repay"));
      $(".repayments").removeClass("d-none");
      $(".interest").addClass("d-none");

      let termInMonth = $('#term').val() * 12;
      let totalRePayment = repaymentValue * termInMonth;
      console.log(totalRePayment);

      $(".monthlyRepayment").text((repaymentValue).toFixed(2));
      $(".totalRepayment").text((totalRePayment).toFixed(2));
    }
    else if (e.target.id === "int") {
      $(".repay-group").removeClass("active-radio-btn");
      $(".int-group").addClass("active-radio-btn");
      interestValue = mortgageCalculator("interest");
      console.log(mortgageCalculator("interest"));
      $(".repayments").addClass("d-none");
    $(".interest").removeClass("d-none");

    let interestPaymentPerMonth = $("#amt").val() * ($("#rate").val() / 100 / 12);
    let totalInterest = (interestValue * ($('#term').val() * 12)) - $("#amt").val();
    console.log(interestPaymentPerMonth);
    console.log(totalInterest);

    $(".monthlyInterest").text((interestPaymentPerMonth).toFixed(2));
    $(".totalInterest").text((totalInterest).toFixed(2));
    }
  });        

  $("#getMortgage").click(() => {
    if ($("#amt").val() !== "" && $("#term").val() !== "" && $("#rate").val() !== "") {
      $(".empty-result").addClass("d-none");
      $(".complete-result").removeClass("d-none");  
    }
    else {
      $(".empty-result").removeClass("d-none");
      $(".complete-result").addClass("d-none");
    }
  });  
  // -------------------------------Clear button
  $("#clearAll").click(() => {
    $("#amt").val("");
    $("#term").val("");
    $("#rate").val("");
    $(".empty-result").removeClass("d-none");    
    $(".complete-result").addClass("d-none");   
  }); 
  function mortgageCalculator(type) {
    let amount = $("#amt").val();
    let interestPerMonth = $("#rate").val() / 100 / 12;
    let termInMonth = $("#term").val() * 12;
    
    let intAmt = amount * interestPerMonth;
    let termInt = (1-((1 + interestPerMonth)**(-termInMonth)));
    /*
    console.log(amount, termInMonth, interestPerMonth);
    console.log(intAmt);console.log(termInt);console.log(intAmt / termInt);
    */ 
    let paymentPerMonth = intAmt / termInt;
    return (paymentPerMonth);
  };
});