/**
 * Company
 */
Cpanel.Collection.Company.permit(['update']).cpanel_ifSuperOrAdmin().apply();

/**
 * Setting
 */
Cpanel.Collection.Setting.permit(['update']).cpanel_ifSuperOrAdmin().apply();

/**
 * Branch
 */
Cpanel.Collection.Branch.permit(['insert']).cpanel_ifSuper().apply();
Cpanel.Collection.Branch.permit(['update']).cpanel_ifSuperOrAdmin().apply();
Cpanel.Collection.Branch.permit(['remove']).cpanel_ifSuper().apply();

/**
 * Exchange
 */
//Cpanel.Collection.Exchange.permit(['insert', 'update', 'remove']).cpanel_ifSuperOrAdmin().apply();
Cpanel.Collection.Exchange.permit(['insert', 'update', 'remove']).ifLoggedIn().apply();
