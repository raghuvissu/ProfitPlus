(function (module) {
    mifosX.services = _.extend(module, {
        ResourceFactoryProvider: function () {
            var baseUrl = "" , apiVer = "/obsplatform/api/v1", tenantIdentifier = "";
            this.setBaseUrl = function (url) {
                baseUrl = url;
                console.log(baseUrl);
            };

            this.setTenantIdenetifier = function (tenant) {
                tenantIdentifier = tenant;
            }
            this.$get = ['$resource', '$rootScope', function (resource, $rootScope) {
                var defineResource =function (url, paramDefaults, actions) {
                    var tempUrl = baseUrl;
                    $rootScope.hostUrl = tempUrl;
                    $rootScope.tenantIdentifier = tenantIdentifier;
                    return resource(baseUrl + url, paramDefaults, actions);
                };
                return {
                    userResource: defineResource(apiVer + "/users/:userId", {userId: '@userId'}, {
                        getAllUsers: {method: 'GET', params: {fields: "id,firstname,lastname,username,officeName"}, isArray: true},
                        getUser: {method: 'GET', params: {}}
                    }),
                    roleResource: defineResource(apiVer + "/roles/:roleId", {roleId: '@roleId', command: '@command'}, {
                        getAllRoles: {method: 'GET', params: {}, isArray: true},
                        deleteRoles: {method: 'DELETE'},
                        disableRoles: {method: 'POST'},
                        enableRoles: {method: 'POST'}
                    }),
                    rolePermissionResource: defineResource(apiVer + "/roles/:roleId/permissions", {roleId: '@roleId'}, {
                        get: {method: 'GET', params: {}},
                        update: {method: 'PUT'}
                    }),
                    permissionResource: defineResource(apiVer + "/permissions", {}, {
                        get: {method: 'GET', params: {}, isArray: true},
                        update: {method: 'PUT'}
                    }),
                    officeResource: defineResource(apiVer + "/offices/:officeId", {officeId: "@officeId"}, {
                        getAllOffices: {method: 'GET', params: {}, isArray: true},
                        getAllOfficesInAlphabeticalOrder: {method: 'GET', params: {orderBy: 'name', sortOrder: 'ASC'}, isArray: true},
                        update: { method: 'PUT'}
                    }),
                    clientResource: defineResource(apiVer + "/clients/:clientId/:anotherresource", {clientId: '@clientId', anotherresource: '@anotherresource', sqlSearch: '@sqlSearch'}, {
                        getAllClients: {method: 'GET', params: {limit: 1000, sqlSearch: '@sqlSearch'}},
                        getAllClientsWithoutLimit: {method: 'GET', params: {}},
                        getClientClosureReasons: {method: 'GET', params: {}},
                        getAllClientDocuments: {method: 'GET', params: {}, isArray: true},
                        update: { method: 'PUT'},
                        create: {method: 'POST', headers: { 'Authorization': 'Basic YWRtaW46YWRtaW4=' }}
                    }),
                    clientChargesResource: defineResource(apiVer + "/clients/:clientId/charges/:resourceType", {clientId: '@clientId', resourceType: '@resourceType'}, {
                        getCharges: {method: 'GET'},
                        waive:{method:'POST' , params:{command : 'waive'}}
                    }),
                    clientTransactionResource: defineResource(apiVer + "/clients/:clientId/transactions/:transactionId", {clientId: '@clientId', transactionId: '@transactionId'}, {
                        getTransactions: {method: 'GET',isArray: true},
                        undoTransaction :{method:'POST', params:{command:'undo'}}
                    }),
                    clientIdentifierResource: defineResource(apiVer + "/client_identifiers/:clientIdentityId/documents", {clientIdentityId: '@clientIdentityId'}, {
                        get: {method: 'GET', params: {}, isArray: true}
                    }),
                    clientDocumentsResource: defineResource(apiVer + "/clients/:clientId/documents/:documentId", {clientId: '@clientId', documentId: '@documentId'}, {
                        getAllClientDocuments: {method: 'GET', params: {}, isArray: true}
                    }),
                    clientAccountResource: defineResource(apiVer + "/clients/:clientId/accounts", {clientId: '@clientId'}, {
                        getAllClients: {method: 'GET', params: {}}
                    }),
                    clientNotesResource: defineResource(apiVer + "/clients/:clientId/notes", {clientId: '@clientId'}, {
                        getAllNotes: {method: 'GET', params: {}, isArray: true}
                    }),
                    clientTemplateResource: defineResource(apiVer + "/clients/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    clientIdenfierTemplateResource: defineResource(apiVer + "/clients/:clientId/identifiers/template", {clientId: '@clientId'}, {
                        get: {method: 'GET', params: {}}
                    }),
                    clientIdenfierResource: defineResource(apiVer + "/clients/:clientId/identifiers/:id", {clientId: '@clientId', id: '@id'}, {
                        get: {method: 'GET', params: {}}
                    }),

                    surveyResource: defineResource(apiVer + "/surveys/:surveyId", {surveyId: '@surveyId'}, {
                        getAll: {method: 'GET', params: {}, isArray: true},
                        get: {method: 'GET', params: {surveyId: '@surveyId'}, isArray: false},
                        update: {method: 'PUT', params: {surveyId: '@surveyId'}},
                        deactivate: {method: 'DELETE', params: {surveyId: '@surveyId'}},
                    }),
                    surveyScorecardResource: defineResource(apiVer + "/surveys/scorecards/:surveyId", {surveyId: '@surveyId'}, {
                        post: {method: 'POST', params: {}, isArray: false}
                    }),
                    clientSurveyScorecardResource: defineResource(apiVer + "/surveys/scorecards/clients/:clientId", {clientId: '@clientId'}, {
                        get: {method: 'GET', params: {clientId: '@clientId'}, isArray: true}
                    }),
                    groupResource: defineResource(apiVer + "/groups/:groupId/:anotherresource", {groupId: '@groupId', anotherresource: '@anotherresource'}, {
                        get: {method: 'GET', params: {}},
                        getAllGroups: {method: 'GET', params: {}, isArray: true},
                        update: { method: 'PUT'}
                    }),
                    groupSummaryResource: defineResource(apiVer + "/runreports/:reportSource", {reportSource: '@reportSource'}, {
                    	get: {method: 'GET', params: {}, isArray: true},
                    	getSummary: {method: 'GET', params: {}}
                    }),
                    groupAccountResource: defineResource(apiVer + "/groups/:groupId/accounts", {groupId: '@groupId'}, {
                        getAll: {method: 'GET', params: {}}
                    }),
                    groupNotesResource: defineResource(apiVer + "/groups/:groupId/notes/:noteId", {groupId: '@groupId', noteId: '@noteId'}, {
                        getAllNotes: {method: 'GET', params: {}, isArray: true}
                    }),
                    groupTemplateResource: defineResource(apiVer + "/groups/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    groupMeetingResource: defineResource(apiVer + "/groups/:groupId/meetings/:templateSource", {groupId: '@groupId', templateSource: '@templateSource'}, {
                        getMeetingInfo: {method: 'GET', params: {}}
                    }),
                    attachMeetingResource: defineResource(apiVer + "/:groupOrCenter/:groupOrCenterId/calendars/:templateSource", {groupOrCenter: '@groupOrCenter', groupOrCenterId: '@groupOrCenterId',
                        templateSource: '@templateSource'}, {
                        update: {method: 'PUT'}
                    }),
                    runReportsResource: defineResource(apiVer + "/runreports/:reportSource", {reportSource: '@reportSource'}, {
                        get: {method: 'GET', params: {}, isArray: true},
                        getReport: {method: 'GET', params: {}}
                    }),
                    reportsResource: defineResource(apiVer + "/reports/:id/:resourceType", {id: '@id', resourceType: '@resourceType'}, {
                        get: {method: 'GET', params: {id: '@id'}},
                        getReport: {method: 'GET', params: {id: '@id'}},
                        getReportDetails: {method: 'GET', params: {id: '@id'}},
                        update: {method: 'PUT', params: {}}
                    }),
                    xbrlMixtaxonomyResource: defineResource(apiVer + "/mixtaxonomy", {}, {
                        get: {method: 'GET', params: {}, isArray: true}
                    }),
                    xbrlMixMappingResource: defineResource(apiVer + "/mixmapping", {}, {
                        get: {method: 'GET', params: {}, isArray: true},
                        update: {method: 'PUT', params: {}}
                    }),
                    DataTablesResource: defineResource(apiVer + "/datatables/:datatablename/:entityId/:resourceId", {datatablename: '@datatablename', entityId: '@entityId', resourceId: '@resourceId'}, {
                        getAllDataTables: {method: 'GET', params: {}, isArray: true},
                        getTableDetails: {method: 'GET', params: {}},
                        update: {method: 'PUT'}
                    }),
                    loanProductResource: defineResource(apiVer + "/loanproducts/:loanProductId/:resourceType", {resourceType: '@resourceType', loanProductId: '@loanProductId'}, {
                        getAllLoanProducts: {method: 'GET', params: {}, isArray: true},
                        getProductmix: {method: 'GET', params: {}},
                        put: {method: 'PUT', params: {}}
                    }),
                    chargeResource: defineResource(apiVer + "/charges/:chargeId", {chargeId: '@chargeId'}, {
                        getAllCharges: {method: 'GET', params: {}, isArray: true},
                        getCharge: {method: 'GET', params: {}},
                        update: {method: 'PUT', params: {}}
                    }),
                    chargeTemplateResource: defineResource(apiVer + "/charges/template", {
                        get: {method: 'GET', params: {}, isArray: true},
                        getChargeTemplates: {method: 'GET', params: {}}
                    }),
                    savingProductResource: defineResource(apiVer + "/savingsproducts/:savingProductId/:resourceType", {savingProductId: '@savingProductId', resourceType: '@resourceType'}, {
                        getAllSavingProducts: {method: 'GET', params: {}, isArray: true},
                        update: {method: 'PUT', params: {}}
                    }),
                    fixedDepositProductResource: defineResource(apiVer + "/fixeddepositproducts/:productId/:resourceType", {productId: '@productId', resourceType: '@resourceType'}, {
                        getAllFixedDepositProducts: {method: 'GET', params: {}, isArray: true},
                        update: {method: 'PUT', params: {}}
                    }),
                    recurringDepositProductResource: defineResource(apiVer + "/recurringdepositproducts/:productId/:resourceType", {productId: '@productId', resourceType: '@resourceType'}, {
                        getAllRecurringDepositProducts: {method: 'GET', params: {}, isArray: true},
                        update: {method: 'PUT', params: {}}
                    }),

                    interestRateChartResource: defineResource(apiVer + "/interestratecharts/:chartId/:resourceType", {chartId:'@chartId', resourceType:'@resourceType'}, {
                        getInterestRateChart: {method: 'GET', params: {productId:'@productId', template:'@template', associations:'@chartSlabs'} , isArray:true},
                        update: {method: 'PUT', params: {}},
                        getAllInterestRateCharts: {method: 'GET', params: {productId: '@productId'}, isArray: true}
                    }),
                    batchResource: defineResource(apiVer + "/batches", {}, {
                        post: {method: 'POST', params: {}, isArray: true}
                    }),
                    loanResource: defineResource(apiVer + "/loans/:loanId/:resourceType/:resourceId", {resourceType: '@resourceType', loanId: '@loanId', resourceId: '@resourceId', limit: '@limit', sqlSearch: '@sqlSearch'}, {
                        getAllLoans: {method: 'GET', params: {limit:'@limit', sqlSearch: '@sqlSearch'}},
                        getAllNotes: {method: 'GET', params: {}, isArray: true},
                        put: {method: 'PUT', params: {}}
                    }),
                    loanChargeTemplateResource: defineResource(apiVer + "/loans/:loanId/charges/template", {loanId: '@loanId'}, {
                        get: {method: 'GET', params: {}}
                    }),
                    loanChargesResource: defineResource(apiVer + "/loans/:loanId/charges/:chargeId", {loanId: '@loanId', chargeId: '@chargeId'}, {
                    }),
                    loanCollateralTemplateResource: defineResource(apiVer + "/loans/:loanId/collaterals/template", {loanId: '@loanId'}, {
                        get: {method: 'GET', params: {}}
                    }),
                    loanTrxnsTemplateResource: defineResource(apiVer + "/loans/:loanId/transactions/template", {loanId: '@loanId'}, {
                        get: {method: 'GET', params: {}}
                    }),
                    loanTemplateResource: defineResource(apiVer + "/loans/:loanId/template", {loanId: '@loanId'}, {
                        get: {method: 'GET', params: {}}
                    }),
                    loanTrxnsResource: defineResource(apiVer + "/loans/:loanId/transactions/:transactionId", {loanId: '@loanId', transactionId: '@transactionId'}, {
                        get: {method: 'GET', params: {}}
                    }),
                    LoanAccountResource: defineResource(apiVer + "/loans/:loanId/:resourceType/:chargeId", {loanId: '@loanId', resourceType: '@resourceType', chargeId: '@chargeId'}, {
                        getLoanAccountDetails: {method: 'GET', params: {}},
                        update: {method: 'PUT'}
                    }),
                    LoanEditDisburseResource: defineResource(apiVer + "/loans/:loanId/disbursements/:disbursementId", {loanId: '@loanId', disbursementId: '@disbursementId'}, {
                        getLoanAccountDetails: {method: 'GET', params: {}},
                        update: {method: 'PUT'}
                    }),
                    LoanAddTranchesResource: defineResource(apiVer + "/loans/:loanId/disbursements/editDisbursements", {loanId: '@loanId'}, {
                        update: {method: 'PUT'}
                    }),
                    LoanDocumentResource: defineResource(apiVer + "/loans/:loanId/documents/:documentId", {loanId: '@loanId', documentId: '@documentId'}, {
                        getLoanDocuments: {method: 'GET', params: {}, isArray: true}
                    }),
                    currencyConfigResource: defineResource(apiVer + "/currencies/:currencyId", {currencyId:'@currencyId'}, {
                        get: {method: 'GET', params: {}},
                        update: { method: 'PUT'},
                        upd: { method: 'PUT', params: {}}
                    }),
                    userListResource: defineResource(apiVer + "/users/:userId", {userId: '@userId'}, {
                        getAllUsers: {method: 'GET', params: {}, isArray: true},
                        update: { method: 'PUT' }
                    }),
                    userTemplateResource: defineResource(apiVer + "/users/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    employeeResource: defineResource(apiVer + "/staff/:staffId", {staffId: '@staffId',status:"all"}, {
                        getAllEmployees: {method: 'GET', params: {}, isArray: true},
                        update: { method: 'PUT' }
                    }),
                    globalSearch: defineResource(apiVer + "/search", {query: '@query', resource: '@resource'}, {
                        search: { method: 'GET',
                            params: { query: '@query' , resource: '@resource'},
                            isArray: true
                        }
                    }),
                    globalSearchTemplateResource: defineResource(apiVer + "/search/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    globalAdHocSearchResource: defineResource(apiVer + "/search/advance/", {}, {
                        get: {method: 'GET', params: {}},
                        search: { method: 'POST', isArray: true },
                        getClientDetails : {method: 'POST', params: {clientInfo: true},isArray: true}
                    }),
                    fundsResource: defineResource(apiVer + "/funds/:fundId", {fundId: '@fundId'}, {
                        getAllFunds: {method: 'GET', params: {}, isArray: true},
                        getFund: {method: 'GET', params: {}},
                        update: {method: 'PUT', params: {}}
                    }),
                    accountingRulesResource: defineResource(apiVer + "/accountingrules/:accountingRuleId", {accountingRuleId: '@accountingRuleId'}, {
                        getAllRules: {method: 'GET', params: {associations: 'all'}, isArray: true},
                        getById: {method: 'GET', params: {accountingRuleId: '@accountingRuleId'}},
                        get: {method: 'GET', params: {}, isArray: true},
                        update: {method: 'PUT'}
                    }),
                    accountingRulesTemplateResource: defineResource(apiVer + "/accountingrules/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    accountCoaResource: defineResource(apiVer + "/glaccounts/:glAccountId", {glAccountId: '@glAccountId'}, {
                        getAllAccountCoas: {method: 'GET', params: {}, isArray: true},
                        update: { method: 'PUT' }
                    }),
                    accountCoaTemplateResource: defineResource(apiVer + "/glaccounts/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    journalEntriesResource: defineResource(apiVer + "/journalentries/:trxid", {trxid: '@transactionId'}, {
                        get: {method: 'GET', params: {transactionId: '@transactionId'}},
                        reverse: {method: 'POST', params: {command: 'reverse'}},
                        search: {method: 'GET', params: {}}
                    }),
                    accountingClosureResource: defineResource(apiVer + "/glclosures/:accId", {accId: "@accId"}, {
                        get: {method: 'GET', params: {}, isArray: true},
                        getView: {method: 'GET', params: {}}
                    }),
                    periodicAccrualAccountingResource: defineResource(apiVer + "/runaccruals", {}, {
                        run: {method: 'POST', params: {}}
                    }),
                    officeOpeningResource: defineResource(apiVer + "/journalentries/openingbalance", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    codeResources: defineResource(apiVer + "/codes/:codeId", {codeId:"@codeId"}, {
                        getAllCodes: {method: 'GET', params: {}},
                        getData: {method: 'GET', params: {}}
                  }),
                    codeValueResource: defineResource(apiVer + "/codes/:codeId/codevalues/:codevalueId", {codeId: '@codeId', codevalueId: '@codevalueId'}, {
                        getAllCodeValues: {method: 'GET', params: {}, isArray: true},
                        update: { method: 'PUT', params: {} }
                    }),
					hookResources: defineResource(apiVer + "/hooks/:hookId", {hookId: "@hookId"}, {
                        getAllHooks: {method: 'GET', params: {}, isArray: true},
                        getHook: {method: 'GET', params: {}},
						update: {method: 'PUT', params: {}}
                    }),
					hookTemplateResource: defineResource(apiVer + "/hooks/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    entityToEntityResource: defineResource(apiVer + "/entitytoentitymapping/:mappingId/:fromId/:toId", {mappingId: '@mappingId'}, {
                        getAllEntityMapping: {method: 'GET', params: {}, isArray: true},
                        getEntityMapValues: {method: 'GET', params: {}}
                    }),
                    entityMappingResource: defineResource(apiVer + "/entitytoentitymapping/:mapId", {mappingId: '@mappingId'}, {
                        getAllEntityMapping: {method: 'GET', params: {}, isArray: true},
                        getEntityMapValues: {method: 'GET', params: {}, isArray: true},
                        update: { method: 'PUT', params: {}},
                        delete:{method:'DELETE',params:{}}
                    }),
                    accountNumberResources: defineResource(apiVer + "/accountnumberformats/:accountNumberFormatId",{accountNumberFormatId: '@accountNumberFormatId'}, {
                        get:{method:'GET',params:{accountNumberFormatId:'@accountNumberFormatId'}},
                        getAllPreferences:{method:'GET',params:{},isArray: true},
                        put:{method:'PUT'},
                        getPrefixType:{method:'GET',params:{template:true}},
                        delete:{method:'DELETE',params:{}}
                    }),
                    accountNumberTemplateResource: defineResource(apiVer + "/accountnumberformats/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    holResource: defineResource(apiVer + "/holidays", {}, {
                        getAllHols: {method: 'GET', params: {}, isArray: true}
                    }),
                    holValueResource: defineResource(apiVer + "/holidays/:holId", {holId: '@holId'}, {
                        getholvalues: {method: 'GET', params: {}},
                        update: { method: 'PUT', params: {}}
                    }),                    
                    holidayTemplateResource: defineResource(apiVer + "/holidays/template", {}, {
                        get: {method: 'GET', params: {}, isArray: true}
                    }),
                    savingsTemplateResource: defineResource(apiVer + "/savingsaccounts/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    savingsResource: defineResource(apiVer + "/savingsaccounts/:accountId/:resourceType/:chargeId", {accountId: '@accountId', resourceType: '@resourceType', chargeId: '@chargeId'}, {
                        get: {method: 'GET', params: {}},
                        getAllNotes: {method: 'GET', params: {}, isArray: true},
                        update: {method: 'PUT'}
                    }),
                    savingsChargeResource: defineResource(apiVer + "/savingsaccounts/:accountId/charges/:resourceType", {accountId: '@accountId', resourceType: '@resourceType'}, {
                        get: {method: 'GET', params: {}},
                        update: {method: 'PUT'}
                    }),
                    savingsTrxnsTemplateResource: defineResource(apiVer + "/savingsaccounts/:savingsId/transactions/template", {savingsId: '@savingsId'}, {
                        get: {method: 'GET', params: {savingsId: '@savingsId'}}
                    }),
                    savingsTrxnsResource: defineResource(apiVer + "/savingsaccounts/:savingsId/transactions/:transactionId", {savingsId: '@savingsId', transactionId: '@transactionId'}, {
                        get: {method: 'GET', params: {savingsId: '@savingsId', transactionId: '@transactionId'}}
                    }),
                    savingsOnHoldTrxnsResource: defineResource(apiVer + "/savingsaccounts/:savingsId/onholdtransactions", {savingsId: '@savingsId'}, {
                        get: {method: 'GET', params: {}}
                    }),
                    fixedDepositAccountResource: defineResource(apiVer + "/fixeddepositaccounts/:accountId/:resourceType", {accountId: '@accountId', resourceType: '@resourceType'}, {
                        get: {method: 'GET', params: {}},
                        update: {method: 'PUT'}
                    }),
                    fixedDepositAccountTemplateResource: defineResource(apiVer + "/fixeddepositaccounts/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    fixedDepositTrxnsTemplateResource: defineResource(apiVer + "/fixeddepositaccounts/:savingsId/transactions/template", {savingsId: '@savingsId'}, {
                        get: {method: 'GET', params: {savingsId: '@savingsId'}}
                    }),
                    fixedDepositTrxnsResource: defineResource(apiVer + "/fixeddepositaccounts/:savingsId/transactions/:transactionId", {savingsId: '@savingsId', transactionId: '@transactionId'}, {
                        get: {method: 'GET', params: {savingsId: '@savingsId', transactionId: '@transactionId'}}
                    }),
                    recurringDepositAccountResource: defineResource(apiVer + "/recurringdepositaccounts/:accountId/:resourceType", {accountId: '@accountId', resourceType: '@resourceType'}, {
                        get: {method: 'GET', params: {}},
                        update: {method: 'PUT'}
                    }),
                    recurringDepositAccountTemplateResource: defineResource(apiVer + "/recurringdepositaccounts/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    recurringDepositTrxnsTemplateResource: defineResource(apiVer + "/recurringdepositaccounts/:savingsId/transactions/template", {savingsId: '@savingsId'}, {
                        get: {method: 'GET', params: {savingsId: '@savingsId'}}
                    }),
                    recurringDepositTrxnsResource: defineResource(apiVer + "/recurringdepositaccounts/:savingsId/transactions/:transactionId", {savingsId: '@savingsId', transactionId: '@transactionId'}, {
                        get: {method: 'GET', params: {savingsId: '@savingsId', transactionId: '@transactionId'}}
                    }),
                    accountTransferResource: defineResource(apiVer + "/accounttransfers/:transferId", {transferId: '@transferId'}, {
                        get: {method: 'GET', params: {transferId: '@transferId'}}
                    }),
                    accountTransfersTemplateResource: defineResource(apiVer + "/accounttransfers/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    standingInstructionResource: defineResource(apiVer + "/standinginstructions/:standingInstructionId", {standingInstructionId: '@standingInstructionId'}, {
                        get: {method: 'GET', params: {standingInstructionId: '@standingInstructionId'}},
                        getTransactions: {method: 'GET', params: {standingInstructionId: '@standingInstructionId', associations: 'transactions'}},
                        withTemplate: {method: 'GET', params: {standingInstructionId: '@standingInstructionId', associations: 'template'}},
                        search: {method: 'GET', params: {}},
                        update: { method: 'PUT', params: {command: 'update'}},
                        cancel: { method: 'PUT', params: {command: 'delete'}}
                    }),
                    standingInstructionTemplateResource: defineResource(apiVer + "/standinginstructions/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    standingInstructionHistoryResource: defineResource(apiVer + "/standinginstructionrunhistory", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    centerAccountResource: defineResource(apiVer + "/centers/:centerId/accounts", {centerId: '@centerId'}, {
                        getAll: {method: 'GET', params: {}, isArray: true}
                    }),
                    centerResource: defineResource(apiVer + "/centers/:centerId/:anotherresource", {centerId: '@centerId', anotherresource: '@anotherresource'}, {
                        get: {method: 'GET', params: {}},
                        getAllCenters: {method: 'GET', params: {}, isArray: true},
                        getAllMeetingFallCenters: {method: 'GET', params: {}, isArray: true},
                        update: { method: 'PUT'}
                    }),
                    centerMeetingResource: defineResource(apiVer + "/centers/:centerId/meetings/:templateSource", {centerId: '@centerId', templateSource: '@templateSource'}, {
                        getMeetingInfo: {method: 'GET', params: {}}
                    }),
                    centerTemplateResource: defineResource(apiVer + "/centers/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    jobsResource: defineResource(apiVer + "/jobs/:jobId/:resourceType", {jobId : '@jobId',resourceType : '@resourceType'}, {
                        get: {method: 'GET', params: {}, isArray: true},
                        getJobDetails: {method: 'GET', params: {}},
                        getJobHistory: {method: 'GET', params: {}},
                        update: {method: 'PUT', params: {}},
                      }),
                    schedulerResource: defineResource(apiVer + "/scheduler", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    assignStaffResource: defineResource(apiVer + "/groups/:groupOrCenterId", {groupOrCenterId: '@groupOrCenterId'}, {
                        get: {method: 'GET', params: {}}
                    }),
                    configurationResource:defineResource(apiVer + "/configurations/:configId",{configId : '@configId'}, {
                        get: {method: 'GET', params: {}},
                        update: {method: 'PUT', params: {}}
                    }),
                    configurationSMTPResource:defineResource(apiVer + "/configurations/smtp",{}, {
                        get: {method: 'GET', params: {}}
                    }),
                    configurationResourceByName: defineResource(apiVer + "/configurations/", {configName: '@configName'}, {
                        get: {method: 'GET', params: {configName:'configName'}}
                    }),
                    cacheResource: defineResource(apiVer + "/caches", {}, {
                        get: {method: 'GET', params: {}, isArray: true},
                        update: {method: 'PUT', params: {}}
                    }),
                    templateResource: defineResource(apiVer + "/templates/:templateId/:resourceType", {templateId: '@templateId', resourceType: '@resourceType'}, {
                        get: {method: 'GET', params: {}, isArray: true},
                        getTemplateDetails: {method: 'GET', params: {}},
                        update: {method: 'PUT', params: {}}
                    }),
                    loanProductTemplateResource: defineResource(apiVer + "/loanproducts/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    loanReassignmentResource: defineResource(apiVer + "/loans/loanreassignment/:templateSource", {templateSource: '@templateSource'}, {
                        get: {method: 'GET', params: {}}
                    }),
                    loanRescheduleResource: defineResource(apiVer + "/rescheduleloans/:scheduleId",{scheduleId:'@scheduleId', command: '@command'},{
                     get: {method: 'GET',params:{}},
                     getAll: {method: 'GET', params: {}, isArray: true},
                     template: {method: 'GET',params:{}},
                     preview:{method:'GET',params:{command:'previewLoanReschedule'}},
                     put: {method: 'POST', params: {command:'reschedule'}},
                     reject:{method:'POST',params:{command:'reject'}},
                     approve:{method:'POST',params:{command:'approve'}}
                     }),
                     auditResource: defineResource(apiVer + "/audits/:templateResource", {templateResource: '@templateResource'}, {
                        get: {method: 'GET', params: {}},
                        search: {method: 'GET', params: {}, isArray: true}
                    }),
                    guarantorResource: defineResource(apiVer + "/loans/:loanId/guarantors/:templateResource", {loanId: '@loanId', templateResource: '@templateResource'}, {
                        get: {method: 'GET', params: {}},
                        update: {method: 'PUT', params: {}},
                        delete: { method: 'DELETE', params: {guarantorFundingId: '@guarantorFundingId'}}
                    }),
                    guarantorAccountResource: defineResource(apiVer + "/loans/:loanId/guarantors/accounts/template", {loanId: '@loanId'}, {
                        get: {method: 'GET', params: {clientId: '@clientId'}},
                        update: {method: 'PUT', params: {}}
                    }),
                    checkerInboxResource: defineResource(apiVer + "/makercheckers/:templateResource", {templateResource: '@templateResource'}, {
                        get: {method: 'GET', params: {}},
                        search: {method: 'GET', params: {}, isArray: true}
                    }),
                    officeToGLAccountMappingResource: defineResource(apiVer + "/financialactivityaccounts/:mappingId", {mappingId: '@mappingId'}, {
                        get: {method: 'GET', params: {mappingId: '@mappingId'}},
                        getAll: {method: 'GET', params: {}, isArray: true},
                        withTemplate: {method: 'GET', params: {mappingId: '@mappingId', template: 'true'}},
                        search: {method: 'GET', params: {}},
                        create: {method: 'POST', params: {}},
                        update: { method: 'PUT', params: {mappingId: '@mappingId'}},
                        delete: { method: 'DELETE', params: {mappingId: '@mappingId'}}
                    }),
                    officeToGLAccountMappingTemplateResource: defineResource(apiVer + "/financialactivityaccounts/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    tellerResource: defineResource(apiVer + "/tellers/:tellerId", {tellerId: "@tellerId"}, {
                        getAllTellers: {method: 'GET', params: {}, isArray: true},
                        get: {method: 'GET', params: {tellerId: '@tellerId'}},
                        update: { method: 'PUT', params: {tellerId: '@tellerId'}},
                        delete: { method: 'DELETE', params: {tellerId: '@tellerId'}}
                    }),
                    tellerCashierResource: defineResource(apiVer + "/tellers/:tellerId/cashiers/:cashierId", {tellerId: "@tellerId", cashierId: "@cashierId"}, {
                        getAllCashiersForTeller: {method: 'GET', params: {tellerId: "@tellerId"}, isArray: false},
                        getCashier: {method: 'GET', params:{tellerId: "@tellerId", cashierId: "@cashierId"}},
                        update: { method: 'PUT', params: {tellerId: "@tellerId", cashierId: "@cashierId"}},
                        delete: { method: 'DELETE', params: {tellerId: "@tellerId", cashierId: "@cashierId"}}
                    }),
                    tellerCashierTemplateResource: defineResource(apiVer + "/tellers/:tellerId/cashiers/template", {tellerId: "@tellerId"}, {
                        get: {method: 'GET', params: {tellerId: '@tellerId'}, isArray: false}
                    }),
                    tellerCashierTxnsResource: defineResource(apiVer + "/tellers/:tellerId/cashiers/:cashierId/transactions", {tellerId: "@tellerId", cashierId: "@cashierId"}, {
                        getCashierTransactions: {method: 'GET', params: {tellerId: "@tellerId", cashierId: "@cashierId"}, isArray: true}
                    }),
                    tellerCashierSummaryAndTxnsResource: defineResource(apiVer + "/tellers/:tellerId/cashiers/:cashierId/summaryandtransactions", {tellerId: "@tellerId", cashierId: "@cashierId"}, {
                        getCashierSummaryAndTransactions: {method: 'GET', params: {tellerId: "@tellerId", cashierId: "@cashierId"}, isArray: false}
                    }),
                    tellerCashierTxnsAllocateResource: defineResource(apiVer + "/tellers/:tellerId/cashiers/:cashierId/allocate", {tellerId: "@tellerId", cashierId: "@cashierId"}, {
                        allocate: { method: 'POST', params: {tellerId: "@tellerId", cashierId: "@cashierId", command: "allocate"}}
                    }),
                    tellerCashierTxnsSettleResource: defineResource(apiVer + "/tellers/:tellerId/cashiers/:cashierId/settle", {tellerId: "@tellerId", cashierId: "@cashierId"}, {
                        settle: { method: 'POST', params: {tellerId: "@tellerId", cashierId: "@cashierId", command: "settle"}}
                    }),
                    cashierTxnTemplateResource: defineResource(apiVer + "/tellers/:tellerId/cashiers/:cashierId/transactions/template", {tellerId: "@tellerId", cashierId: "@cashierId"}, {
                        get: {method: 'GET', params: {tellerId: "@tellerId", cashierId: "@cashierId"}, isArray: false}
                    }),
                    collectionSheetResource: defineResource(apiVer + "/collectionsheet", {}, {
                    }),
                    workingDaysResource: defineResource(apiVer + "/workingdays", {}, {
                        get: {method: 'GET', params: {}},
                        put: {method: 'PUT', params:{}}
                    }),
                    workingDaysResourceTemplate: defineResource(apiVer + "/workingdays/template", {}, {
                       get: {method: 'GET', params: {}}
                    }),
                    passwordPrefTemplateResource: defineResource(apiVer + "/passwordpreferences/template", {}, {
                        get: {method: 'GET', params: {}, isArray : true},
                        put: {method: 'PUT', params:{}}
                    }),
                    passwordPrefResource : defineResource(apiVer + "/passwordpreferences", {}, {
                        put: {method: 'PUT', params:{}}
                    }),
                    paymentTypeResource: defineResource(apiVer + "/paymenttypes/:paymentTypeId", {paymentTypeId: "@paymentTypeId"}, {
                        getAll: {method: 'GET', params: {}, isArray: true},
                        get: {method: 'GET' , params: {paymentTypeId: '@paymentTypeId'}},
                        update: {method: 'PUT', params: {paymentTypeId: '@paymentTypeId'}}
                    }),
                    externalServicesS3Resource: defineResource(apiVer + "/externalservice/S3", {},{
                        get: {method: 'GET', params: {}, isArray : true},
                        put: {method: 'PUT', params:{}}
                    }),
                    externalServicesSMTPResource: defineResource(apiVer + "/externalservice/SMTP", {},{
                        get: {method: 'GET', params: {}, isArray : true},
                        put: {method: 'PUT', params:{}}
                    }),
                    externalServicesResource: defineResource(apiVer + "/externalservice/:id", {id: '@id'},{
                        get: {method: 'GET', params: {}, isArray : true},
                        put: {method: 'PUT', params:{}}
                    }),
                    clientaddressFields:defineResource(apiVer+"/client/addresses/template",{},{
                            get:{method:'GET',params:{}}
                        }
                    ),
                    addressFieldConfiguration:defineResource(apiVer+"/fieldconfiguration/:entity",{},{
                        get:{method:'GET',params:{},isArray:true }
                    }),
                    clientAddress:defineResource(apiVer+"/client/:clientId/addresses",{},{

                        post:{method:'POST',params:{type:'@type'}},
                        get:{method:'GET',params:{type:'@type',status:'@status'},isArray:true},
                        put:{method:'PUT',params:{}}
                    }),
                    familyMember:defineResource(apiVer+"/clients/:clientId/familymembers/:clientFamilyMemberId",{},{

                        get:{method: 'GET',params:{} },
                        delete:{method: 'DELETE',params:{}},
                            put:{method:'PUT',params:{}}

                    }),
                    familyMemberTemplate:defineResource(apiVer+"/clients/:clientId/familymembers/template",{},{
                        get:{method: 'GET',params:{}}
                    }),
                   provisioningcriteria: defineResource(apiVer + "/provisioningcriteria/:criteriaId",{criteriaId:'@criteriaId'},{
                         get: {method: 'GET',params:{}},
                        getAll: {method: 'GET',params:{}, isArray : true},
                        template: {method: 'GET',params:{}},
                        post:{method:'POST',params:{}},
                        put: {method: 'PUT', params: {}}
                    }),
                    provisioningentries: defineResource(apiVer + "/provisioningentries/:entryId",{entryId:'@entryId'},{
                        get: {method: 'GET',params:{}},
                        getAll: {method: 'GET',params:{}},
                        template: {method: 'GET',params:{}},
                        post:{method:'POST',params:{}},
                        put: {method: 'PUT', params: {}},
                        createJournals:{method:'POST', params:{command : 'createjournalentry'}},
                        reCreateProvisioningEntries:{method:'POST', params:{command : 'recreateprovisioningentry'}},
                        getJournals: {method: 'GET', params: {entryId: '@entryId'}}
                    }),
                    provisioningjournals: defineResource(apiVer + "/journalentries/provisioning", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    provisioningentriesSearch: defineResource(apiVer + "/provisioningentries/entries", {}, {
                        get: {method: 'GET', params: {}}
                    }),

                    provisioningcategory: defineResource(apiVer + "/provisioningcategory", {}, {
                        getAll: {method: 'GET', params: {}, isArray : true}
                    }),

                    floatingrates: defineResource(apiVer + "/floatingrates/:floatingRateId",{floatingRateId:'@floatingRateId'},{
                        get: {method: 'GET',params:{}},
                        getAll: {method: 'GET',params:{}, isArray : true},
                        post:{method:'POST',params:{}},
                        put: {method: 'PUT', params: {}}
                    }),
                    variableinstallments: defineResource(apiVer + "/loans/:loanId/schedule",{loanId:'@loanId'},{
                        validate:{method:'POST',params:{command: 'calculateLoanSchedule'}},
                        addVariations:{method:'POST',params:{command: 'addVariations'}},
                        deleteVariations:{method:'POST',params:{command: 'deleteVariations'}}
                    }),
                    taxcomponent: defineResource(apiVer + "/taxes/component/:taxComponentId",{taxComponentId:'@taxComponentId'},{
                        getAll: {method: 'GET', params: {}, isArray : true},
                        put: {method: 'PUT', params: {}}
                    }),
                    taxcomponenttemplate: defineResource(apiVer + "/taxes/component/template",{},{
                    }),
                    taxgroup: defineResource(apiVer + "/taxes/group/:taxGroupId",{taxGroupId:'@taxGroupId'},{
                        getAll: {method: 'GET', params: {}, isArray : true},
                        put: {method: 'PUT', params: {}}
                    }),
                    taxgrouptemplate: defineResource(apiVer + "/taxes/group/template",{},{
                    }),

                    productsResource: defineResource(apiVer + "/products/:productType/:resourceType",{productType:'@productType', resourceType:'@resourceType'},{
                        template: {method: 'GET',params:{}},
                        post: {method: 'POST', params:{}}
                    }),
                    shareProduct: defineResource(apiVer + "/products/share/:shareProductId",{shareProductId:'@shareProductId'},{
                        post:{method:'POST',params:{}},
                        getAll: {method: 'GET',params:{}},
                        get: {method: 'GET', params:{}},
                        put: {method: 'PUT', params:{}}
                    }),
                    shareAccountTemplateResource: defineResource(apiVer + "/accounts/share/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    sharesAccount: defineResource(apiVer + "/accounts/share/:shareAccountId", {shareAccountId: '@shareAccountId'}, {
                        get: {method: 'GET', params: {}},
                        post: {method: 'POST', params:{}},
                        put: {method: 'PUT', params:{}}
                    }),
                    shareproductdividendresource: defineResource(apiVer + "/shareproduct/:productId/dividend/:dividendId", {productId: '@productId', dividendId: '@dividendId'}, {
                        get: {method: 'GET', params: {}},
                        getAll: {method: 'GET',params:{}},
                        post: {method: 'POST', params:{}},
                        put: {method: 'PUT', params:{}},
                        approve: {method: 'PUT', params:{command: 'approve'}}
                    }),

                    smsCampaignTemplateResource: defineResource(apiVer + "/smscampaigns/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),

                    smsCampaignResource: defineResource(apiVer + "/smscampaigns/:campaignId/:additionalParam", {campaignId: '@campaignId', additionalParam: '@additionalParam'}, {
                        getAll: {method: 'GET', params: {}},
                        get: {method: 'GET', params: {}},
                        save: {method: 'POST', params: {}},
                        update: {method: 'PUT', params: {}},
                        preview: {method: 'POST', params: {}},
                        withCommand: {method: 'POST', params: {}},
                        delete: {method: 'DELETE', params: {}}
                    }),

                    smsResource: defineResource(apiVer + "/sms/:campaignId/messageByStatus", {campaignId: '@campaignId', additionalParam: '@additionalParam'}, {
                        getByStatus: {method: 'GET', params:{}}
                    }),

                    entityDatatableChecksResource: defineResource(apiVer + "/entityDatatableChecks/:entityDatatableCheckId/:additionalParam", {entityDatatableCheckId: '@entityDatatableCheckId', additionalParam: '@additionalParam'}, {
                        getAll: {method: 'GET', params: {}},
                        get: {method: 'GET', params: {}},
                        save: {method: 'POST', params: {}},
                        delete: {method: 'DELETE', params: {}}
                    }),
					
					adHocQueryResource: defineResource(apiVer + "/adhocquery/:adHocId", {adHocId: '@adHocId'}, {
                        getAllAdHocQuery: {method: 'GET', params: {}, isArray: true},
                        disableAdHocQuery: {method: 'POST'},
                        enableAdHocQuery: {method: 'POST'},
                        update: { method: 'PUT' }
                    }),
                    serviceResource: defineResource(apiVer + "/servicemasters/:serviceId", {serviceId:"@serviceId"}, {
                    	get: {method: 'GET', params: {}},
                    	update: {method: 'PUT'}
                    }),  
                    /*productResource: defineResource(apiVer + "/servicemasters/:serviceId", {serviceId:"@serviceId"}, {
                    	get: {method: 'GET', params: {}},
                    	update: {method: 'PUT'}
                    }),*/
                    serviceResourceForDetails: defineResource(apiVer + "/servicemasters/:serviceId/:paramCategory", {serviceId:"@serviceId",paramCategory:"@paramCategory"}, {
                    	  update: {method: 'PUT'}
                      }),
                    adHocQueryTemplateResource: defineResource(apiVer + "/adhocquery/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),
                    AddressTemplateResource: defineResource(apiVer + "/address/template/:city", {city:'@city'}, {
                        get: {method: 'GET', params: {}}
                    }),
                    propertyCodeTemplateResource: defineResource(apiVer + "/property/template", {}, {
                    	update: { method: 'PUT' }
                    }),
                    propertyCodeResource: defineResource(apiVer + "/property/:otherResource/:propertyId", {otherResource:'@otherResource',propertyId:'@propertyId'}, {
                     	  getAlldetails: {method: 'GET', params: {}},
                        update: { method: 'PUT' }
                    }),
                    oneTimeSaleResource: defineResource(apiVer + "/onetimesales/:clientId", {clientId:'@clientId'}, {
                     	getOneTimeSale: {method: 'GET', params: {clientId:'@clientId'}}
                    }),
                    getOrderResource: defineResource(apiVer + "/orders/:clientId/orders", {clientId:'@clientId'}, {
                    	getAllOrders: {method: 'GET', params: {}},
                    }),
                    clientserviceResource:defineResource(apiVer + "/clientservice/:clientId", {clientId:'@clientId'}, {
                   	  get: {method: 'GET', params: {},isArray: true},
                    }),
                    EventActionResource: defineResource(apiVer + "/eventactions/:clientId", {clientId:'@clientId'}, {
                    	get: {method: 'GET', params: {},isArray: true},
	                }),
                    planResource: defineResource(apiVer + "/plans/:planId", {planId:'@planId'}, {
                    	get: {method: 'GET', params: {}},
                    	update: { method: 'PUT' }
                    }),
                    planTemplateResource: defineResource(apiVer + "/plans/template", {}, {
                        get: {method: 'GET', params: {}}
                    }),                  
                    priceResource: defineResource(apiVer + "/prices/:planId", {planId:'@planId'}, {
                        getAllPrices: {method: 'GET', params: {}, isArray: true},
                        update: { method: 'PUT' }
                    }),
                    chargecodeResource: defineResource(apiVer + "/chargecode/:chargeCodeId", {chargeCodeId:'@chargeCodeId'}, {
                        update: { method: 'PUT' }
                    }),
                    chargecodetemplateResource: defineResource(apiVer + "/chargecode/template", {}, {
                    	  
                    }),
                    taxmappingResource: defineResource(apiVer + "/taxmap/:chargeCode/chargetax", {chargeCode:'@chargeCode'}, {
                  	  	update: { method: 'PUT' }
                    }),
                    getTaxmappingResource: defineResource(apiVer + "/taxmap/:taxId", {taxId:'@taxId'}, {
                  	  update: { method: 'PUT' }
                    }),
                    taxmappingtemplateResource: defineResource(apiVer + "/taxmap/template", {}, {
                    	  getAlltaxmapping: {method: 'GET', params: {}}
                      }),

                    serviceTemplateResource: defineResource(apiVer + "/servicemasters/template", {}, {}),
                    priceTemplateResource: defineResource(apiVer + "/prices/template", {}, {
                        get: {method: 'GET', params: {planId:'@planId'}}
                    }),
                    deletePriceResource: defineResource(apiVer + "/prices/:priceId", {priceId:'@priceId'}, {
                        update: { method: 'PUT' }
                    }),
                    getPriceResource: defineResource(apiVer + "/prices/pricedetails/:priceId", {priceId:'@priceId'}, {
                        get: {method: 'GET', params: {}},
                        update: { method: 'PUT' }
                    }),
                    updatePriceResource: defineResource(apiVer + "/prices/update/:priceId", {priceId:'@priceId'}, {
                        update: { method: 'PUT' }
                    }),
                    serviceTemplateResource: defineResource(apiVer + "/servicemasters/template", {}, {}),
                    clientserviceTemplateResource:defineResource(apiVer + "/clientservice/template", {}, {
                     	  get: {method: 'GET', params: {}},
                    }),
                    clientserviceparamResource:defineResource(apiVer + "/clientservice/servicedetails/:serviceId", {serviceId:'@serviceId'}, {
                   	  get: {method: 'GET', params: {},isArray: true},
                    }),
                    clientservicesaveResource:defineResource(apiVer + "/clientservice", {}, {}),
                    paymentsTemplateResource: defineResource(apiVer + "/payments/template", {}, {
                        getPayments: {method: 'GET', params: {}}
                    }),
                    payInvoiceTemplateResource: defineResource(apiVer + "/invoice/:invoiceId",{invoiceId: '@invoiceId'},  {
                  	  	getPayInvoices: { method: 'GET', params: {},isArray: true }
                    }),
                    paymentsResource: defineResource(apiVer + "/payments/:clientId", {clientId:'@clientId'}, {
                        get: {method: 'GET', params: {}}
                    }),
                    cancelPaymentResource: defineResource(apiVer + "/payments/cancelpayment/:paymentId", {paymentId:'@paymentId'}, {
                        update: { method: 'PUT' }
                    }),
                    commissionWithdrawResource: defineResource(apiVer + "/payments/withdraw/:clientId", {clientId:'@clientId'}, {
                        get: {method: 'GET', params: {}}
                    }),
                    creditDistributionResource: defineResource(apiVer + "/creditdistributions/:clientId",{clientId:'@clientId'}, {
                    	get: { method: 'GET', params: {}}
                    }),
                    addressEditResource: defineResource(apiVer + "/address/addressdetails/:clientId",{clientId:'@clientId'},  {
                  	  get: {method: 'GET', params: {}},
                  	  getAll: {method: 'GET', params: {clientId:'@clientId'}}
                    }),
                    addressResource: defineResource(apiVer + "/address/:clientId",{clientId:'@clientId'},  {
                 	   getAllAddresses: {method: 'GET', params: {}},
                     	update: {method: 'PUT', params: {}}        	 
                    }),
                    clientServiceDetailsResource:defineResource(apiVer + "/clientservice/details/:clientId/:clientServiceId", {clientId:'@clientId',clientServiceId:'@clientServiceId'}, {
                   	 	get: {method: 'GET', params: {}}
                    }),
                    clientServiceActivationResource:defineResource(apiVer + "/clientservice/:clientServiceId", {clientServiceId:'@clientServiceId'}, {
                   	  get: {method: 'GET', params: {}},
                    }),
                    oneTimeSaleTemplateResource: defineResource(apiVer + "/onetimesales/template", {}, {
                        getOnetimes: {method: 'GET', params: {}}
                    }),
                    pairableitemMasterDetailResource: defineResource(apiVer + "/itemdetails/pairableitems/:serialNo", {serialNo: '@serialNo'}, {
                   	 	get: {method: 'GET', params: {}},
                        search: {method: 'GET', params: {}, isArray: true}
                    }),
                    itemMasterDetailTemplateResource: defineResource(apiVer + "/itemdetails/serialnum", {}, {}),
                    swapDeviceResource: defineResource(apiVer + "/itemdetails/swapdevice",{},  {
                  	  update: { method: 'PUT'}
                    }),
                    orderTemplateResource: defineResource(apiVer + "/orders/template", {planId:'@orderId'}, {}),
                    orderResource: defineResource(apiVer + "/orders/:planId/template", {planId:'@planId'}, {
                        get: {method: 'GET', params: {}},
                    }),
                    saveOrderResource: defineResource(apiVer + "/orders/:clientId", {clientId:'@clientId'}, {
                        get: {method: 'GET', params: {}},
                        update: { method: 'PUT' }
                     }),
                     changeOrderResource: defineResource(apiVer + "/orders/changePlan/:orderId", {orderId:'@orderId'}, {
                         get: {method: 'GET', params: {}},
                         update: { method: 'PUT' }
                     }),
                     OrderSchedulingResource: defineResource(apiVer + "/orders/scheduling/:clientId", {clientId:'@clientId'}, {
                          get: {method: 'GET', params: {}},
                          update: { method: 'PUT' }
                     }),
                     OrderrenewalResourceTemplate: defineResource(apiVer + "/orders/renewalorder", {},{
                    	 get: {method: 'GET', params: {}},
                    	update: { method: 'PUT' }
                     }),
                     OrderrenewalResource: defineResource(apiVer + "/orders/renewal/:orderId", {orderId:'@orderId'},{
                    	 update: { method: 'PUT' }
                     }),
                     getSingleOrderResource: defineResource(apiVer + "/orders/:orderId/orderprice", {orderId:'@orderId'}, {
                    	  get: {method: 'GET', params: {}},
                    	  update: { method: 'PUT' }
                      }),
                      terminateClientServiceResource:defineResource(apiVer + "/clientservice/terminate/:clientServiceId", {clientServiceId:'@clientServiceId'}, {
                      	 update: {method: 'PUT'}
                      }),
                      reactiveClientServiceResource:defineResource(apiVer + "/clientservice/reactive/:clientServiceId", {clientServiceId:'@clientServiceId'}, {
                     	 update: {method: 'PUT'}
                      }),
                      OrderDisconnectResource: defineResource(apiVer + "/orders/disconnect", {}, {
                       	  get: {method: 'GET', params: {}},
                      }),
                      OrderSuspensionResource: defineResource(apiVer + "/orders/suspend/:orderId", {orderId:'@orderId'},{
                         	update: { method: 'PUT' },
                          get: {method: 'GET', params: {}},
                      }),
                      suspendClientServiceResource:defineResource(apiVer + "/clientservice/suspend/:clientServiceId", {clientServiceId:'@clientServiceId'}, {
                     	 update: {method: 'PUT'}
                      }),
                    broadCasterResource:defineResource(apiVer + "/broadcaster/:broadcasterId", {broadcasterId: '@broadcasterId'}, {
                   	  get: {method: 'GET', params: {}},
                   	  update: { method: 'PUT' }
                   }),
                   channelResource:defineResource(apiVer + "/channel/:channelId", {channelId:'@channelId'}, {
                  	  get: {method: 'GET', params: {}},
                  	  update: { method: 'PUT'}
                   }),
                   channelTemplateResource:defineResource(apiVer + "/channel/template", {}, {
                  	  gettemplate: {method: 'GET', params: {}}
                   }),
                   channelMappingResource:defineResource(apiVer + "/channelmapping/:channelmappingId", {channelmappingId: '@channelmappingId'}, {
                  	  get: {method: 'GET', params: {}},
                  	  update: { method: 'PUT'}
                  }),
                  channelMappingTemplateResource:defineResource(apiVer + "/channelmapping/template", {}, {
                 	  gettemplate: {method: 'GET', params: {}}
                  }),
                  contractResource: defineResource(apiVer + "/subscriptions/:subscriptionId", {subscriptionId:'@SubscriptionId'}, {
                      update: { method: 'PUT' }
                  }),
                  contractTemplateResource: defineResource(apiVer + "/subscriptions/template", {}, {
                      get: {method: 'GET', params: {}}
                  }),
                  assignedTicketsResource: defineResource(apiVer + "/tickets/assignedTickets", {}, {
                	  get: {method: 'GET', params: {}, isArray: true},
                	  update: {method: 'PUT'}
                  }),  
                  getAllTicketResource: defineResource(apiVer + "/tickets/alltickets",{},  {
                  	  getAllDetails: {method: 'GET', params: {}},
                  	  get: {method: 'GET', params: {}}
                  }),
                  getAllProspectResource: defineResource(apiVer + "/prospects/allprospects",{},  {
                       getAllDetails: {method: 'GET', params: {}},
                       get: {method: 'GET', params: {}}
                  }),
                  prospectResource: defineResource(apiVer + "/prospects/:prospectId", {prospectId:'@prospectId'}, {
                       getAllProspects: {method: 'GET', params: {}, isArray: true},
                       getDetails: {method: 'GET', params: {clientProspectId:'@clientProspectId'}},
                       getViewProspects: {method: 'GET', params: {}},
                       update: {method: 'PUT', params: {}}
                  }),            
                  prospectFollowUpResource: defineResource(apiVer + "/prospects/followup/:prospectId",{prospectId: '@prospectId'}, {
                   	  get: {method: 'GET', params: {}},
                   	  update: {method: 'PUT', params: {}}
               	  }), 
               	  prospectTemplateResource: defineResource(apiVer + "/prospects/template", {}, {
                 	  getTemplate: {method: 'GET', params: {}},
                 	  update: {method: 'PUT', params: {}}
                  }),
                  prospectHistoryResource: defineResource(apiVer + "/prospects/:prospectdetailid/history", {prospectdetailid:'@prospectdetailid'}, {
                      getHistoryProspects: {method: 'GET', params: {}}
                  }),
                  prospectCancelResource: defineResource(apiVer + "/prospects/cancel/:prospectId", {prospectId:'@prospectId'}, {
                      getProspects: {method: 'GET', params: {}},
                  }),
                  prospectConvertResource: defineResource(apiVer + "/prospects/converttoclient/:deleteProspectId", {deleteProspectId:'@deleteProspectId'}, {
                      getViewProspects: {method: 'GET', params: {}}
                  }),
                  AddressTemplateResource: defineResource(apiVer + "/address/template/:city", {city:'@city'}, {
                      get: {method: 'GET', params: {}}
                  }),
                  groupsDetailsResource: defineResource(apiVer + "/groupsdetails", {}, {}),
                  groupsDetailsProvisionResource: defineResource(apiVer + "/groupsdetails/provision/:groupId", {groupId:"@groupId"}, {}),
                  taxExemptionResource: defineResource(apiVer + "/taxexemption/:clientId", {clientId:'@clientId'}, {
                      update: { method: 'PUT' }
                  }),
                  clientParentResource: defineResource(apiVer + "/parentclient/:clientId/:anotherresource", {clientId:'@clientId',anotherresource:'@anotherresource'}, {
                      get: {method: 'GET', params: {}},
                      update: { method: 'PUT'}
                  }),
                  clientBillModeResource: defineResource(apiVer + "/billmodes/:clientId", {clientId:'@clientId'}, {
                  	get: {method: 'GET', params: {}},
                      update: { method: 'PUT' }
                  }),
                  clientAdditionalResource: defineResource(apiVer + "/clients/additionalinfo/:clientId", {clientId:'@clientId'}, {
                       getAll: {method: 'GET', params: {}, isArray:true},
                       update: {method: 'PUT'}
                  }),
                  creditCardSaveResource: defineResource(apiVer + "/clients/:clientId/carddetails", {clientId:'@clientId'}, {
                      get: {method: 'GET', params: {},isArray: true}
                  }),
                  clientAdditionalTemplateResource: defineResource(apiVer + "/clients/additionalinfo/template", {}, {
                      get: {method: 'GET', params: {}}
                  }),
                  ticketResource: defineResource(apiVer + "/tickets/:clientId/:id",{clientId:'@clientId', id:'@id'},  {
                	  get: {method: 'GET', params: {}},
                	  getAll: {method: 'GET', params: {}, isArray:true}
                  }),
                  eventOrderPriceUpdateTemplateResource: defineResource(apiVer + "/eventorder",{},{
                  	update: {method: 'PUT', params: {}},
                      get: {method: 'GET', params: {clientId:'@clientId'},isArray:true }
                  }),
                  eventOrderTemplateResource: defineResource(apiVer + "/eventorder/:clientId",{},  {
                	  get: {method: 'GET', params: {clientId:'@clientId'}}
                  }),
                  FineTransactionResource: defineResource(apiVer + "/financialTransactions/:clientId", {clientId:'@clientId'}, {
                     	getAllFineTransactions: {method: 'GET', params: {}, }
                  }),
                  Filetrans: defineResource(apiVer + "/financialTransactions/:clientId/type", {clientId:'@clientId'}, {
                     	get: {method: 'GET', params: {}, }
          	      }),
                  FiletransForOtp: defineResource(apiVer + "/financialTransactions/otp/list", {}, {
                        get: {method: 'GET', params: {}, }
                  }),
          	      adjustmentTemplateResource: defineResource(apiVer + "/adjustments/template", {}, {
          	    	  get: {method: 'GET', params: {}}
                  }),
                  adjustmentResource: defineResource(apiVer + "/adjustments/:clientId", {clientId:'@clientId'}, {
                      get: {method: 'GET', params: {}}
                  }),
                  statementResource: defineResource(apiVer + "/billmaster/:clientId", {clientId:'@clientId'}, {
                      get: {method: 'GET', params: {}},
                      update: { method: 'PUT'}
                  }),
                  transactionHistoryResource: defineResource(apiVer + "/transactionhistory/:clientId", {clientId:'@clientId'}, {
                	  getTransactionHistory: {method: 'GET', params: {clientId:'@clientId'}, }
                  }),
                  transactionOldHistoryResource: defineResource(apiVer + "/transactionhistory/template/:clientId", {clientId:'@clientId'}, {
                   		getTransactionHistory: {method: 'GET', params: {clientId:'@clientId'}, }
                  }),
                  ticketResourceTemplate: defineResource(apiVer + "/tickets/template",{},  {
                  	  get: {method: 'GET', params: {}},
                  	  getForCloseTicket: {method: 'GET', params: {}, isArray:true}
                  }), 
                  creditDistributionTemplateResource: defineResource(apiVer + "/creditdistributions/template/:clientId",{clientId:'@clientId'},  {
                	  get: { method: 'GET', params: {}}
                  }),
                  clientIpPoolingResource: defineResource(apiVer + "/ippooling/:clientId", {clientId: '@clientId'}, {
                 	  get: {method: 'GET', params: {},isArray: true},
                  }),
                  ticketHistoryResource: defineResource(apiVer + "/tickets/:id/history",{id:'@id'},  {
                  	  get: {method: 'GET', params: {}}
                  }),
                  editTicketResource: defineResource(apiVer + "/tickets/:clientId/update/:id",{clientId:'@clientId', id:'@id'},  {
                	  get: {method: 'GET', params: {}},
                	  getAll: {method: 'GET', params: {}, isArray:true}
                  }),
                  financialResource: defineResource(apiVer + "/financialTransactions/:transactionId/invoice", {transactionId:'@transactionId'}, {
                 	  getAllDetails: {method: 'GET', params: {}}
                  }),
                  regionResource: defineResource(apiVer + "/regions/:regionId/:resourceType", {regionId:'@regionId', resourceType:'@resourceType'}, {
                      get: {method: 'GET', params: {regionId:'@regionId'}},
                      getRegion: {method: 'GET', params: {regionId:'@regionId'}, isArray:true},
                      getRegionDetails: {method: 'GET', params: {regionId:'@regionId'}},
                      update: {method: 'PUT', params: {}}
                    }),
                  regionResourceTemplate: defineResource(apiVer + "/regions/template",{},  {
                  	  getAllRegions: {method: 'GET', params: {}}     	 
                    }),
                  regionResourceGetStates: defineResource(apiVer + "/regions/getstates/:countryId",{countryId:'@countryId'},  {
                    	  get: {method: 'POST', params: {}}     	 
                    }),
                  supplierResource: defineResource(apiVer + "/suppliers/:id", {id: '@id'}, {
                	  getAlldetails: {method: 'GET', params: {}},
                      get: {method: 'GET', params: {},isArray: true},
                      update: {method: 'PUT', params: {}}
                  }),
                  itemTemplateResource: defineResource(apiVer + "/items/template", {}, {
                  	 getAllItems: {method: 'GET', params: {}, isArray: true},
                  	 get: {method: 'GET', params: {}}
                  }),
                  itemResource: defineResource(apiVer + "/items/:itemId", {itemId:'@itemId'}, {
                  	 getAllItems: {method: 'GET', params: {}, isArray: true},
                     get: {method: 'GET', params: {}},
                     update: {method: 'PUT', params: {}}
                   }),
                   grnTemplateResource: defineResource(apiVer + "/grn/template", {},{
                       get: {method: 'GET', params: {}}
                   }),
                   grnResource: defineResource(apiVer + "/grn/:grnId", {grnId: '@grnId'},{
                       get: {method: 'GET', params: {}},
                      update: {method: 'PUT', params: {}}
                   }),
                   supplierItemsResource: defineResource(apiVer + "/items/supplier/:supplierId",{supplierId: '@supplierId'},{
                	   get: {method: 'GET', params: {}},
                   }),
                  discountResource: defineResource(apiVer + "/discount/:discountId", {discountId:'@discountId'}, {
                       get: {method: 'GET', params: {}, isArray: true},
                   	   update: { method: 'PUT' }
                  }),
                  discountTemplateResource: defineResource(apiVer + "/discount/template", {}, {
                      get: {method: 'GET', params: {}}
                  }),
                  discountsResource: defineResource(apiVer + "/discount/:discountId/:resourceType", {discountId:'@discountId', resourceType:'@resourceType'}, {
                      get: {method: 'GET', params: {discountId:'@discountId'}},
                      getDiscount: {method: 'GET', params: {discountId:'@discountId'}, isArray:true},
                      getDiscountDetails: {method: 'GET', params: {discountId:'@discountId'}},
                      update: {method: 'PUT', params: {}}
                  }),
                  promotionResource: defineResource(apiVer + "/promotioncode/:promotioncodeId", {promotioncodeId:'@promotioncodeId'}, {
                	  get: {method: 'GET', params: {}, isArray: true},
                	  getPrmotioncodeDetails: {method: 'GET', params: {promotioncodeId:'@promotioncodeId'}},
                	  update: { method: 'PUT' }
        	      }),  
                  
        	      promotionTemplateResource: defineResource(apiVer + "/promotioncode/template", {}, {
                	  get: {method: 'GET', params: {}}
        	      }),
                   addCountryResource: defineResource(apiVer + "/address/country/new",{},  {
                 	  get: {method: 'POST', params: {}}
         	       }),
         	       editCountryResource: defineResource(apiVer + "/address/country/:id",{id: '@id'},  {
                 	 update: { method: 'PUT' }
         	       }),
         	      addStateResource: defineResource(apiVer + "/address/state/new",{},  {
         	       	  get: {method: 'POST', params: {}}
         	      }),
         	      editStateResource: defineResource(apiVer + "/address/state/:id",{id: '@id'},  {
                 	update: { method: 'PUT' }
                  }),
                  addCityResource: defineResource(apiVer + "/address/city/new",{},  {
                 	  get: {method: 'POST', params: {}}
                  }),
                  editCityResource: defineResource(apiVer + "/address/city/:id",{id: '@id'},  {
                	  update: { method: 'PUT' }
                  }),
                  mappingResource: defineResource(apiVer + "/servicemapping/:servicemapId", {servicemapId:'@servicemapId'}, {
                      get: {method: 'GET', params: {}},
                      update: { method: 'PUT'}
                  }),
                  planMappingResource: defineResource(apiVer + "/planmapping/:planMappingId", {planMappingId:'@planMappingId'}, {
                      get: {method: 'GET', params: {}, isArray: true},
                      getPlanMapping: {method: 'GET', params: {planMappingId:'@planMappingId'}},
                      update: { method: 'PUT'}
                  }),  
                  planMappingtemplateResource: defineResource(apiVer + "/planmapping/template", {}, {
                   	  getAllPlanMapping: {method: 'GET', params: {}}
                  }),
                  hardwareMappingResource: defineResource(apiVer + "/hardwaremapping/:hardwaremapId", {hardwaremapId:'@hardwaremapId'}, {
                      getDetails: {method: 'GET', params: {}},
                      update: { method: 'PUT'}
                  }) ,   
                  
                  hardwaretemplateMappingResource: defineResource(apiVer + "/hardwaremapping/template", {}, {
                        getTemplateData: {method: 'GET', params: {}}
                  }),
                  provisioningMappingResource: defineResource(apiVer + "/provisioning/:provisioningId", {provisioningId: '@provisioningId'}, {
                	  getprovisiongData: {method: 'GET', params: {}, isArray: true},
                      get: {method: 'GET', params: {}},
                      update: { method: 'PUT' }
                  }),
                  EventActionMappingResource: defineResource(apiVer + "/eventactionmapping/:id", {id:'@id'}, {
                      getDetails: {method: 'GET', params: {}},
                      update: { method: 'PUT'}
                  }),
                  EventActionMappingTemplateResource: defineResource(apiVer + "/eventactionmapping/template", {}, {
                 	  get: {method: 'GET', params: {}}
                  }),
                  
                  EventValidationResource: defineResource(apiVer + "/eventvalidation/:id", {id:'@id'}, {
                     get: {method: 'GET', params: {}, isArray: true},
                     getDetails: {method: 'GET', params: {}},
                     update: { method: 'PUT'}
                  }),
                  provisionactionsResource: defineResource(apiVer + "/provisioningactions/:id", {id:'@id'}, {
                     get: {method: 'GET', params: {}, isArray: true},
                     update: { method: 'PUT'}
                  }),
                  serviceMappingResource: defineResource(apiVer + "/servicemapping/:serviceMappingId", {serviceMappingId: '@serviceMappingId'}, {
                      update: { method: 'PUT' }
                  }),
                  serviceMappingtemplateResource: defineResource(apiVer + "/servicemapping/template", {}, {
                  	  getAllserviceMapping: {method: 'GET', params: {}}
                  }),
                  provisioningtemplateMappingResource: defineResource(apiVer + "/provisioning/template/:clientServiceId", {clientServiceId: '@clientServiceId'}, {
                  	
                  }),
                  currencyResource: defineResource(apiVer + "/countrycurrency/:id/:resourceType", {id:'@id', resourceType:'@resourceType'}, {
                      update: {method: 'PUT', params: {}}
                  }),
                 currencyTemplateResource: defineResource(apiVer + "/countrycurrency/template", {}, {
                     get: {method: 'GET', params: {}}
                  }),
                  itemDetailTemplateResource: defineResource(apiVer + "/itemdetails/template", {grnId: '@grnId'}, {
                      get: {method: 'GET', params: {}}	
                  }),
                  itemDropdownResource:defineResource(apiVer + "/items/all", {}, {
                 	  get: {method: 'GET', params: {}},
                 }),
                 itemDetailsResource: defineResource(apiVer + "/itemdetails/:itemId/:anotherresource", {itemId:'@itemId',anotherresource:'@anotherresource'}, {
                  	  getAlldetails: {method: 'GET', params: {}},
                        get: {method: 'GET', params: {}},
   		             update: {method: 'PUT', params: {}}
                 }),
                 mediaDetailsResource: defineResource(apiVer + "/assets/mediadata", {}, {}),
                 
                 mediaTemplateResource: defineResource(apiVer + "/assets/template", {}, {}),
                 
                 mediaLocationAttributesResource: defineResource(apiVer + "/assets/locationAttributes/:mediaId", {mediaId:'@mediaId'}, {}),
                  
                  itemhistoryResource: defineResource(apiVer + "/mrn/history/", {},{
                   	  getAlldetails: {method: 'GET', params: {}},
                   	  get: {method: 'GET', params: {}}
                  }),
                  itemDetailsforDeleteResource: defineResource(apiVer + "/itemdetails/:itemId", {itemId:'@itemId'}, {
                   	  	 getAlldetails: {method: 'GET', params: {}},
                         get: {method: 'GET', params: {}},
    		             update: {method: 'PUT', params: {}}
                  }),
                  viewMrnResource: defineResource(apiVer + "/mrn/view/", {},{
                	  	 getAlldetails: {method: 'GET', params: {}},
                	  	 get: {method: 'GET', params: {}}
                  }), 
                  itemSaleTemplateResource: defineResource(apiVer + "/itemsales/template", {}, {
                    	 get: {method: 'GET', params: {}}
                  }),
                  itemSaleResource: defineResource(apiVer + "/itemsales", {}, {
                      	 get: {method: 'GET', params: {}}
                  }),
                  itemSalesResource: defineResource(apiVer + "/itemsales/sales/:viewitemId", {viewitemId:'@viewitemId'}, {
                   	 get: {method: 'GET', params: {}}
                  }),
                  oneTimeSaleTemplateResourceData: defineResource(apiVer + "/onetimesales/:itemId/item", {itemId:'@itemId'}, {
                      get: {method: 'GET', params: {}}
                  }),
                  viewitemsaleResource: defineResource(apiVer + "/itemsale/view/", {},{
             	  	 getAlldetails: {method: 'GET', params: {}},
             	  	 get: {method: 'GET', params: {}}
               }), 
                  oneTimeSaleQuantityResource: defineResource(apiVer + "/onetimesales/:itemId/totalprice", {itemId:'@itemId'}, {
                	  get: {method: 'POST', params: {}}
                  }),
                  officeTemplateResource: defineResource(apiVer + "/offices/template", {}, {
                      get: {method: 'GET', params: {}},
                  }),
                  partnerResource: defineResource(apiVer + "/partners/:partnerId", {partnerId :'@partnerId'}, {
                 	 update: { method: 'PUT' }
                  }),
                  patnerDisbursementResource: defineResource(apiVer + "/patnerdisbursement", {}, {
                  	update: { method: 'PUT' }
                  }),
                  patnerDisbursementTemplateResource: defineResource(apiVer + "/patnerdisbursement/template", {}, {
                  	update: { method: 'PUT' }
                  }),
                  partnerTemplateResource: defineResource(apiVer + "/partners/template", {}, {
                      get: {method: 'GET', params: {}}
                  }),
                  agreementResource: defineResource(apiVer + "/agreements/:partnerId/:agreementId/:anotherResource", {partnerId :'@partnerId',
                  		agreementId:'@agreementId',anotherResource:'@anotherResource'}, {
                  		update: { method: 'PUT' }
                  }),
                  agreementTemplateResource: defineResource(apiVer + "/agreements/template", {}, {}),
                 saveMediaResource: defineResource(apiVer + "/assets/:mediaId", {mediaId:'@mediaId'}, {
                     getAllMedia: {method: 'GET', params: {}, isArray: true},
                             update: { method: 'PUT' }
                 }),
                 mediaGameTemplateResource: defineResource(apiVer + "/assets/gamedata/template", {}, {
                     get: {method: 'GET', params: {}}
                 }),
                 saveMediaGameTemplateResource: defineResource(apiVer + "/assets/gamedata", {}, {
                     get: {method: 'GET', params: {}}
                 }),
                 eventResource: defineResource(apiVer + "/eventmaster",{},  {
                 	  get: {method: 'GET', params: {}, isArray:true }
                 }),
                 eventTemplateResource: defineResource(apiVer + "/eventmaster/template",{},  {
                 	  get: {method: 'GET', params: {}}
                 }),
                 eventEditResource: defineResource(apiVer + "/eventmaster/:eventId",{eventId:'@eventId'},  {
                 	  get: {method: 'GET', params: {} },
                 	  update: {method: 'PUT'}
                 }),
                 eventPriceTemplateResource: defineResource(apiVer + "/eventprice/template/:resourceType",{eventId:'@eventId', resourceType:'@resourceType'},  {
                   	  get: {method: 'GET', params: {eventId:'@eventId'}, isArray:true},
                   	  getpriceDetails: {method: 'GET', params: {eventId:'@eventId'}}
                 }),
                 eventpriceResource: defineResource(apiVer + "/eventprice/:eventId/:resourceType",{eventId:'@eventId', resourceType:'@resourceType'},  {
                     getprice: {method: 'GET', params: {eventId:'@eventId'}, isArray:true}
                 }),
                 eventPriceEditResource: defineResource(apiVer + "/eventprice/singleeventprice/:id",{id:'@id'},  {
                      geteventpricedetail: {method: 'GET', params: {id:'@id'}},
                      update: {method: 'PUT', params: {}}
                 }),
                 eventPriceUpdateResource: defineResource(apiVer + "/eventprice/:id",{id:'@id'},  {
               	  	  update: {method: 'PUT', params: {}}
                 }),
                 jobsparameters: defineResource(apiVer + "/jobs/:jobId/jopparameters", {jobId : '@jobId'}, {
                     get: {method: 'GET', params: {}},
                     update: {method: 'PUT', params: {}},
                 }),
                 importProcessResource: defineResource(apiVer + "/datauploads/:uploadfileId", {}, {
                     update: { method: 'PUT' }
                  }),
                  importResource: defineResource(apiVer + "/datauploads", {}, {
                      getAllimportfiles: {method: 'GET', params: {}, isArray: true},
                      getdata: {method: 'GET', params: {}},
                      update: { method: 'PUT' }
                  }),
                 singleItemDetailResource: defineResource(apiVer + "/itemdetails/singleitem/:itemId", {}, {
                     get: {method: 'GET', params: {}}	
                 }),
                 mrnResource: defineResource(apiVer + "/mrn/:mrnId", {}, {
                  	  getAlldetails: {method: 'GET', params: {}, isArray: true},
                  	  get: {method: 'GET', params: {}}
                 }),
                 mrnTemplateResource: defineResource(apiVer + "/mrn/template", {}, {
                  	  getAlldetails: {method: 'GET', params: {}, isArray: true},
                  	  get: {method: 'GET', params: {}}
                 }),
                 moveMrnResource: defineResource(apiVer + "/mrn/template/ids", {}, {
                  	  getAlldetails: {method: 'GET', params: {}, isArray: true},
                  	  get: {method: 'GET', params: {}}
                 }),
                 moveMrnSaveResource: defineResource(apiVer + "/mrn/movemrn/:mrnId", {}, {
                     get: {method: 'GET', params: {}},
                 	 getMovedMrnResource: {method: 'GET', params: {mrnId:'@mrnId'}}
                 }),
                 moveItemSaleSaveResource: defineResource(apiVer + "/mrn/moveitemsale", {}, {
                     get: {method: 'GET', params: {}},
                 }),
                 messageTemplateResource: defineResource(apiVer + "/messages/template",{},  {
                 	  get: {method: 'GET', params: {}}
                 }),
                 messageSaveResource: defineResource(apiVer + "/messages/:messageId",{messageId:'@messageId'},  {
                 	  get: {method: 'GET', params: {}},
                 	  update: {method: 'PUT'}
                 }),
                 propertyTemplateResource: defineResource(apiVer + "/propertymaster/template", {}, {
                 	  update: { method: 'PUT' }
                 }),
                 propertyResource: defineResource(apiVer + "/propertymaster/:otherResource/:propertyId", {otherResource:'@otherResource',propertyId:'@propertyId'}, {
                  	  getAlldetails: {method: 'GET', params: {}},
                      update: { method: 'PUT' }
                 }),
                 paymentGatewayConfigurationResource:defineResource(apiVer + "/paymentgatewayconfigs/:configId",{configId : '@configId'}, {
                     get: {method: 'GET', params: {}},
                     update: {method: 'PUT', params: {}}
                 }),
                 simpleactivationProcessResource: defineResource(apiVer + "/activationprocess/simpleactivation",{},  {
               	     get: {method: 'GET', params: {clientId:'@clientId'}}
                 }),

                 
                 simpleactivationserviceProcessResource: defineResource(apiVer + "/activationprocess/simpleactivation/:clientId",{clientId:'@clientId'},  {
                	  get: {method: 'GET', params: {clientId:'@clientId'}}
                 }),

                 modelProvisionMappingResource: defineResource(apiVer + "/modelprovisionmapping/:modelProvisionMappingId",{modelProvisionMappingId:'@modelProvisionMappingId'},  {
               	  	 get: {method: 'GET', params: {}},
               	  	 update: {method: 'PUT'}
                 }),
                 modelProvisionMappingTemplateResource: defineResource(apiVer + "/modelprovisionmapping/template",{},  {
               	   	 get: {method: 'GET', params: {}}
                 }),
                 paymentGatewayResource: defineResource(apiVer + "/paymentgateways/:id", {id: '@id'}, {
               	     get: {method: 'GET', params: {}},
               	     getData: {method: 'GET', params: {id:'@id'}},
               	     update: { method: 'PUT' }
                 }) ,
                 osdResource:  defineResource(apiVer + "/orders/retrackOsdmessage",{},  {
                 	 getPost: {method: 'POST', params: {} }
                 }), 
                 commandCenterResource:  defineResource(apiVer + "/provisioning/commandparams/:commandId",{commandId:'@commandId'},  {
                 	 get: {method: 'GET', params: {commandId:'@commandId'} }
                 }),
                 eventActionResource: defineResource(apiVer + "/eventactions", {}, {}),
                 searchClientDataResource:defineResource(apiVer + "/clients/search/:columnName", {columnName: '@columnName'}, {
                	  get: {method: 'GET', params: {}},
                 }),
                 clientInvoiceResource: defineResource(apiVer + "/chargingorder/:clientId", {clientId:'@clientId'}, {
                     get: {method: 'GET', params: {}},
                     update: { method: 'PUT'}
                 }),
                 propertydeviceMappingTemaplateResource: defineResource(apiVer + "/property/propertycodes/:clientId", {clientId:'@clientId'}, {
                	 get: {method: 'GET', params: {},isArray: true}
                 }),
                 propertydeviceMappingResource: defineResource(apiVer + "/property/allocatedevice/:clientId", {clientId:'@clientId'}, {
                 	update: { method: 'PUT' }
                 }),
                 unallocateDeviceResource: defineResource(apiVer + "/itemdetails/deallocate/:allocationId", {allocationId:'@allocationId'}, {
                 	update: {method: 'PUT', params: {saleId:'@saleId'}}
                 }),  
                 allocateHardwareResource: defineResource(apiVer + "/itemdetails/allocation", {}, {
                     get: {method: 'GET', params: {}}
                 }),
                 pairedDeviceViewResource: defineResource(apiVer + "/onetimesales/paired/:serialNo", {serialNo:'@serialNo'}, {
                     get: {method: 'GET', params: {},isArray: true}
                 }),
                 updateProvisioningMappingResource: defineResource(apiVer + "/provisioning/updateprovisiondetails/:provisioningId", {provisioningId: '@provisioningId'}, {
                     update: { method: 'PUT' }
                 }),
                 salescatalogeResource: defineResource(apiVer + "/salescataloge/:salescatalogeId", {salescatalogeId:'@salescatalogeId'}, {
                   	get: {method: 'GET', params: {}},
                   	update: { method: 'PUT' }
                 }),
                 salescatalogemappingTemplateResource:defineResource(apiVer + "/salescatalogemapping/template", {}, {
                 	  gettemplate: {method: 'GET', params: {}}
                 }),
                usercatalogeResource:defineResource(apiVer + "/usercataloge/:usercatalogeId", {usercatalogeId: '@usercatalogeId'}, {
                 	  get: {method: 'GET', params: {}},
                 	  update: { method: 'PUT'}
                 }),
                 usercatalogeofUserResource:defineResource(apiVer + "/usercataloge/:userId", {userId: '@userId'}, {
                	  get: {method: 'GET', params: {}},
                	  update: { method: 'PUT'}
                }),
                 usercatalogeTemplateResource:defineResource(apiVer + "/usercataloge/template", {}, {
                	  gettemplate: {method: 'GET', params: {}}
                 }),
                  
                 
                 depositAmountResource: defineResource(apiVer + "/deposit/:client", {client:'@client'}, {}),
                 clientSearchOfficeResource: defineResource(apiVer + "/clients/searching/:officeId", {officeId:'@officeId'}, {
                     get: {method: 'GET', params: {}}
                 }),
                 orderCommandCenterTemplateResource: defineResource(apiVer + "/orders/commandcentertemplate", {}, {
                	 get: {method: 'GET', params: {}} 
                 }),
                 provisioningCommandsResource: defineResource(apiVer + "/provisioning/commands/:provisioningSystemId", {provisioningSystemId: '@provisioningSystemId'}, {
                	 get: {method: 'GET', params: {},isArray: true}	
                 }),
                 statementEmailResource: defineResource(apiVer + "/billmaster/email/:statementId", {statementId:'@statementId'}, {
                     get: {method: 'GET', params: {}, isArray: true},
                     update: { method: 'PUT'}
                 }),
                 singleStatementResource: defineResource(apiVer + "/billmaster/:billId/billdetails", {billId:'@billId'}, {
                     get: {method: 'GET', params: {},isArray:true}
                 }),
                 voucherpinResource: defineResource(apiVer + "/vouchers/:voucherId", {voucherId:'@voucherId'}, {
                     getAllEmployees: {method: 'GET', params: {}, isArray: true},
                 	   update: {method: 'PUT', params: {}}
                 }),
                 voucherpinTemplateResource: defineResource(apiVer + "/vouchers/template", {}, {}),
                 voucherpinsByIdResource: defineResource(apiVer + "/vouchers/voucherslist/:voucherId", {voucherId:'@voucherId'}, {
                 }),
                 cancelVoucherTemplateResource: defineResource(apiVer + "/vouchers/cancel/template", {}, {
                     get: {method: 'GET', params: {}}
                 }),
                 CancelvoucherpinResource: defineResource(apiVer + "/vouchers/cancel/:voucherId", {voucherId:'@voucherId'}, {
               	  	update: { method: 'PUT' }
                 }),
                 confirmProvisioningDetailsResource: defineResource(apiVer + "/provisioning/confirm/:provisioningId", {provisioningId: '@provisioningId'}, {
                     update: { method: 'PUT' }
                   }),

                   provisioningDetailsMappingResource: defineResource(apiVer + "/provisioning/client/:clientId", {clientId: '@clientId'}, {
                      	
                   }),
                 currencyConfigAllResource: defineResource(apiVer + "/currencies/all", {}, {
                     get: {method: 'GET', params: {}},
                     update: { method: 'PUT'},
                     upd: { method: 'PUT', params: {}}
                 }),
                 clientBillProfileResource: defineResource(apiVer + "/clients/billprofile/:clientId", {clientId: '@clientId'}, {
                     get: {method: 'GET', params: {}},
                 }),
                 clientBillInfoResource: defineResource(apiVer + "/clientbillprofile/:clientId", {clientId: '@clientId'}, {
                     update: { method: 'PUT' }
                 }),
                 
                 client360resource: defineResource(apiVer + "/clients/getclient360", {}, {
                	 get: {method: 'GET', params: {}},
                 }),
                 
                 itemDetailTemplateDropdownResource: defineResource(apiVer + "/itemdetails/template/dropdown", {}, {
                     get: {method: 'GET', params: {}}	
                 }),
                 closeTicketResource: defineResource(apiVer + "/tickets/:ticketId",{ticketId:'@ticketId'},  {
               	  get: {method: 'GET', params: {}},
               	  update: {method: 'PUT', params: {}}
                 }),
                 officeAdjustmentsTemplateResource: defineResource(apiVer + "/officeadjustments/template", {}, {
                     getAdjustments: {method: 'GET', params: {}}
                 }),
                 officeAdjustmentsResource: defineResource(apiVer + "/officeadjustments/:officeId", {officeId:'@officeId'}, {
                     postAdjustments: {method: 'POST', params: {officeId:'@officeId'}}
                 }),
                 officePaymentsTemplateResource: defineResource(apiVer + "/officepayments/template", {}, {
                     getPayments: {method: 'GET', params: {}}
                 }),
                 officePaymentsResource: defineResource(apiVer + "/officepayments/:officeId", {officeId:'@officeId'}, {
                     postPayments: {method: 'POST', params: {officeId:'@officeId'}}
                 }),
                 officeFinancialTransactionResource: defineResource(apiVer + "/offices/financialtransactions/:officeId", {officeId:'@officeId'}, {
                     get: {method: 'GET', params: {officeId:'@officeId'},isArray: true}
                 }),
                 
                 productTemplateResource: defineResource(apiVer + "/product/template", {}, {}),
                 productResourceForDetails: defineResource(apiVer + "/product/:productId/:paramCategory", {productId:"@productId",paramCategory:"@paramCategory"}, {
               	  update: {method: 'PUT'}
                 }),
                 productResource: defineResource(apiVer + "/product/:productId", {productId:"@productId"}, {
                 	get: {method: 'GET', params: {}},
                 	update: {method: 'PUT'}
                 }),
                 lco: defineResource(apiVer + "/lco/clients/", {}, {
                  	getClients: {method: 'GET', params: {limit: 1000, sqlSearch: '@sqlSearch'}}
                  	
                  }),
                 referalResource: defineResource(apiVer + "/referals/:referalId", {referalId: "@referalId"}, {
                        getAllReferals: {method: 'GET', params: {}, isArray: true},
                        getAllReferalsInAlphabeticalOrder: {method: 'GET', params: {orderBy: 'name', sortOrder: 'ASC'}, isArray: true},
                        update: { method: 'PUT'}
                    }),

                  getClientwithCafIdResource: defineResource(apiVer + "/referals/cafId/:cafId", {cafId: "@cafId"}, {
                        get: {method: 'GET', headers: { 'Authorization': 'Basic YWRtaW46YWRtaW4=' }}
                  }),
                  confirmPaymentResource: defineResource(apiVer + "/payments/confirmpayment/:paymentId", {paymentId:"@paymentId"}, {
                    update: {method: 'PUT'}
                 }),
                 officeImgResource: defineResource(apiVer + "/offices/image/:officeId/:fileName", {officeId: '@officeId', fileName: '@fileName'}, {
                     getAllimages: {method: 'GET', params: {limit: 1000, sqlSearch: '@sqlSearch'}},
                 })
                };
            }];
        }
    });
    mifosX.ng.services.config(function ($provide) {
        $provide.provider('ResourceFactory', mifosX.services.ResourceFactoryProvider);
    }).run(function ($log) {
        $log.info("ResourceFactory initialized");
    });
}(mifosX.services || {}));
