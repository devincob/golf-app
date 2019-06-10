export default {
  'POST /Achievement/Bussiness/Data.json': (req, res) => {
    return {
      orderCount: '@integer',
      orderDoingCount: '@integer',
      orderCompletedCount: '@integer',
      orderAmount: '@decimal',
      orderDoingAmount: '@decimal',
      orderCompletedAmount: '@decimal'
    }
  },
  'POST /Common/Detail/Company.json': (req, res) => {
    return {
      serviceFeeDiscount: '@decimal',
      companyId: '@integer',
      companyName: '@string',
      customerId: '@integer',
      customerName: '@string',
      sourceTaxId: '@integer',
      sourceTaxName: '@string',
      goodsId: '@integer',
      goodsName: '@string',
      invoiceServiceRatio: '@decimal',
      'invoiceTypeNames|10': [],
      'invoiceContents|10': []
    }
  },
  'POST /Common/Do/Bind.json': (req, res) => {
    return {
      adminUserId: '@integer',
      sessionId: '@string'
    }
  },
  'POST /Common/Do/CreateCode.json': (req, res) => {
    return {
      codeSn: '@string',
      base64Image: '@string'
    }
  },
  'POST /Common/Do/Login.json': (req, res) => {
    return {
      'isBindMobile|1': [true, false],
      adminUserId: '@integer',
      sessionId: '@string'
    }
  },
  'POST /Common/Do/Upload.json': (req, res) => {
    return {imageUrl: '@string'}
  },
  'POST /Common/Do/UploadIdCard.json': (req, res) => {
    return {
      url: '@string',
      realName: '@string',
      idCardNo: '@string',
      nation: '@string'
    }
  },
  'POST /Common/List/Company.json': (req, res) => {
    return {
      companyName: '@string',
      companyId: '@integer'
    }
  },
  'POST /Common/List/CompanyType.json': (req, res) => {
    return {
      companyTypeId: '@integer',
      companyTypeName: '@string',
      businessScope: '@string',
      'invoiceContents|10': []
    }
  },
  'POST /Common/List/Customer.json': (req, res) => {
    return {
      customerId: '@integer',
      customerName: '@string',
      phone: '@string'
    }
  },
  'POST /Common/List/Goods.json': (req, res) => {
    return {
      goodsId: '@integer',
      goodsName: '@string',
      taxType: '@string',
      invoiceTypeId: '@integer',
      invoiceTypeName: '@string',
      invoiceServiceRatio: '@decimal',
      serviceCharge: '@decimal',
      deposit: '@decimal'
    }
  },
  'POST /Common/List/SourceTax.json': (req, res) => {
    return {
      sourceTaxId: '@integer',
      sourceTaxName: '@string',
      zZSRatio: '@decimal',
      gRSDSRatio: '@decimal',
      fJSRatio: '@decimal',
      yHSRatio: '@decimal',
      isNeedFinanceID: '@string'
    }
  },
  'POST /Common/Query/CompanyInvoice.json': (req, res) => {
    return {
      companyName: '@string',
      companyTaxNo: '@string',
      companyAddress: '@string',
      companyPhone: '@string',
      companyBankName: '@string',
      companyBankAccount: '@string'
    }
  },
  'POST /Common/Query/InvoiceCompany.json': (req, res) => {
    return {
      companyId: '@string',
      companyName: '@string'
    }
  },
  'POST /Common/Query/Time.json': (req, res) => {
    return {serverTime: '@string'}
  },
  'POST /Customer/Do/DeleteAddress.json': (req, res) => {
    return true
  },
  'POST /Customer/Do/DeleteInvoiceInfo.json': (req, res) => {
    return true
  },
  'POST /Customer/Do/SaveAddress.json': (req, res) => {
    return '@integer'
  },
  'POST /Customer/Do/SaveInvoiceInfo.json': (req, res) => {
    return '@integer'
  },
  'POST /Customer/List/Address.json': (req, res) => {
    return {
      addressId: '@integer',
      address: '@string',
      receiver: '@string',
      phone: '@string',
      remark: '@string'
    }
  },
  'POST /Customer/List/InvoiceInfo.json': (req, res) => {
    return {
      invoiceInfoId: '@integer',
      invoiceInfoType: '@string',
      invoiceCompanyName: '@string',
      invoiceCompanyTaxNo: '@string',
      invoiceCompanyAddress: '@string',
      invoiceCompanyPhone: '@string',
      invoiceCompanyBankName: '@string',
      invoiceCompanyBankNo: '@string'
    }
  },
  'POST /AO/Detail.json': (req, res) => {
    return {
      orderInfo: 'AccountOrderInfo',
      'bankReceipts|10': [],
      companyRegInfo: 'CompanyRegInfo',
      processInfo: 'ProcessInfo',
      companyAttachment: 'CompanyAttachmentInfo',
      accountOrderExpress: 'AccountOrderExpressInfo',
      customerServiceRecord: 'CustomerServiceRecordInfo',
      'isShowButton|1': [true, false],
      status: '@string',
      handleAdminUserName: '@string',
      handleAdminRoleName: '@string'
    }
  },
  'POST /AO/Do/Delete.json': (req, res) => {
    return true
  },
  'POST /AO/Do/Save.json': (req, res) => {
    return {
      orderId: '@integer',
      orderNo: '@string'
    }
  },
  'POST /AO/Do/SaveExpress.json': (req, res) => {
    return true
  },
  'POST /AO/List/Complete.json': (req, res) => {
    return {
      orderId: '@integer',
      orderNo: '@string',
      customerId: '@integer',
      customerName: '@string',
      sourceTaxId: '@integer',
      sourceTaxName: '@string',
      goodsId: '@integer',
      goodsName: '@string',
      totalAmount: '@decimal',
      realDepositFee: '@decimal',
      fomartTotalAmount: '@string',
      fomartRealDepositFee: '@string',
      isPriority: '@string',
      createTime: '@string',
      submitTime: '@string',
      bussinessName: '@string',
      workflowName: '@string',
      workflowId: '@integer',
      myHandle: '@integer',
      handleAdminUserName: '@string',
      handleAdminRoleName: '@string'
    }
  },
  'POST /AO/List/Process.json': (req, res) => {
    return {
      fomartRealDepositFee: '@string',
      isPriority: '@string',
      orderNo: '@string',
      customerId: '@integer',
      customerName: '@string',
      sourceTaxId: '@integer',
      sourceTaxName: '@string',
      goodsId: '@integer',
      goodsName: '@string',
      totalAmount: '@decimal',
      realDepositFee: '@decimal',
      fomartTotalAmount: '@string',
      createTime: '@string',
      submitTime: '@string',
      bussinessName: '@string',
      workflowName: '@string',
      workflowId: '@integer',
      myHandle: '@integer',
      handleAdminUserName: '@string',
      handleAdminRoleName: '@string',
      orderId: '@integer'
    }
  },
  'POST /AO/List/WaitHandle.json': (req, res) => {
    return {
      orderNo: '@string',
      customerId: '@integer',
      customerName: '@string',
      sourceTaxId: '@integer',
      sourceTaxName: '@string',
      goodsId: '@integer',
      goodsName: '@string',
      totalAmount: '@decimal',
      realDepositFee: '@decimal',
      fomartTotalAmount: '@string',
      fomartRealDepositFee: '@string',
      isPriority: '@string',
      createTime: '@string',
      submitTime: '@string',
      bussinessName: '@string',
      workflowName: '@string',
      workflowId: '@integer',
      myHandle: '@integer',
      handleAdminUserName: '@string',
      handleAdminRoleName: '@string',
      orderId: '@integer'
    }
  },
  'POST /IO/Detail.json': (req, res) => {
    return {
      orderInfo: 'InvoiceOrderInfo',
      'bankReceipts|10': [],
      invoiceInfo: 'InvoiceInfo',
      customerServiceRecord: 'CustomerServiceRecordInfo',
      'isShowButton|1': [true, false],
      status: '@string',
      handleAdminUserName: '@string',
      handleAdminRoleName: '@string'
    }
  },
  'POST /IO/Do/Delete.json': (req, res) => {
    return true
  },
  'POST /IO/Do/Save.json': (req, res) => {
    return {
      orderId: '@integer',
      orderNo: '@string'
    }
  },
  'POST /IO/List/Complete.json': (req, res) => {
    return {
      orderId: '@integer',
      orderNo: '@string',
      customerId: '@integer',
      customerName: '@string',
      sourceTaxId: '@integer',
      sourceTaxName: '@string',
      goodsId: '@integer',
      goodsName: '@string',
      invoiceAmount: '@decimal',
      fomartInvoiceAmount: '@string',
      invoiceTypeName: '@string',
      isPriority: '@string',
      workflowName: '@string',
      workflowId: '@integer',
      createTime: '@string',
      myHandle: '@integer',
      orderCompletedTime: '@string',
      handleAdminUserName: '@string',
      submitTime: '@string',
      companyName: '@string',
      companyId: '@integer',
      bussinessName: '@string',
      handleAdminRoleName: '@string'
    }
  },
  'POST /IO/List/Process.json': (req, res) => {
    return {
      orderId: '@integer',
      orderNo: '@string',
      customerId: '@integer',
      customerName: '@string',
      sourceTaxId: '@integer',
      sourceTaxName: '@string',
      goodsId: '@integer',
      goodsName: '@string',
      invoiceAmount: '@decimal',
      fomartInvoiceAmount: '@string',
      invoiceTypeName: '@string',
      isPriority: '@string',
      workflowName: '@string',
      workflowId: '@integer',
      createTime: '@string',
      myHandle: '@integer',
      orderCompletedTime: '@string',
      handleAdminUserName: '@string',
      submitTime: '@string',
      companyName: '@string',
      companyId: '@integer',
      bussinessName: '@string',
      handleAdminRoleName: '@string'
    }
  },
  'POST /IO/List/WaitHandle.json': (req, res) => {
    return {
      orderNo: '@string',
      customerId: '@integer',
      customerName: '@string',
      sourceTaxId: '@integer',
      sourceTaxName: '@string',
      goodsId: '@integer',
      goodsName: '@string',
      invoiceAmount: '@decimal',
      fomartInvoiceAmount: '@string',
      invoiceTypeName: '@string',
      isPriority: '@string',
      workflowName: '@string',
      workflowId: '@integer',
      createTime: '@string',
      myHandle: '@integer',
      orderCompletedTime: '@string',
      handleAdminUserName: '@string',
      submitTime: '@string',
      companyName: '@string',
      companyId: '@integer',
      bussinessName: '@string',
      handleAdminRoleName: '@string',
      orderId: '@integer'
    }
  },
  'POST /O/Do/Next.json': (req, res) => {
    return true
  },
  'POST /O/Do/Reject.json': (req, res) => {
    return true
  },
  'POST /O/Do/RejectRestart.json': (req, res) => {
    return true
  },
  'POST /User/Detail.json': (req, res) => {
    return {
      adminUserId: '@integer',
      userName: '@string',
      mobile: '@string',
      adminRoleId: '@integer',
      adminRoleName: '@string',
      flowRoleId: '@integer',
      userMail: '@string',
      'isBusiness|1': [true, false],
      flowRoleName: '@string'
    }
  },
  'POST /User/Do/ChangePwd.json': (req, res) => {
    return true
  }
}
