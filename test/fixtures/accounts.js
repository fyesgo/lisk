/*
 * Copyright © 2018 Lisk Foundation
 *
 * See the LICENSE file at the top-level directory of this distribution
 * for licensing information.
 *
 * Unless otherwise agreed in a custom licensing agreement with the Lisk Foundation,
 * no part of this software, including this file, may be copied, modified,
 * propagated, or distributed except according to the terms contained in the
 * LICENSE file.
 *
 * Removal or modification of this copyright notice is prohibited.
 */

'use strict';

const stampit = require('stampit');
const randomstring = require('randomstring');

const accounts = {};

// Existing delegate account
accounts.existingDelegate = {
	address: '10881167371402274308L',
	publicKey: 'addb0e15a44b0fdc6ff291be28d8c98f5551d0cd9218d749e30ddb87c6e31ca9',
	password:
		'actress route auction pudding shiver crater forum liquid blouse imitate seven front',
	balance: '0',
	delegateName: 'genesis_100',
};

// Genesis account, initially holding 100M total supply
accounts.genesis = {
	address: '16313739661670634666L',
	publicKey: 'c094ebee7ec0c50ebee32918655e089f6e1a604b83bcaa760293c61e0f18ab6f',
	password:
		'wagon stock borrow episode laundry kitten salute link globe zero feed marble',
	balance: '10000000000000000',
	encryptedSecret:
		'ddbb37d465228d52a78ad13555e609750ec30e8f5912a1b8fbdb091f50e269cbcc3875dad032115e828976f0c7f5ed71ce925e16974233152149e902b48cec51d93c2e40a6c95de75c1c5a2c369e6d24',
	key: 'elephant tree paris dragon chair galaxy',
};

accounts.mem_accountsFields = [
	'username',
	'isDelegate',
	'u_isDelegate',
	'secondSignature',
	'u_secondSignature',
	'u_username',
	'address',
	'publicKey',
	'secondPublicKey',
	'balance',
	'u_balance',
	'vote',
	'rate',
	'delegates',
	'u_delegates',
	'multisignatures',
	'u_multisignatures',
	'multimin',
	'u_multimin',
	'multilifetime',
	'u_multilifetime',
	'nameexist',
	'u_nameexist',
	'producedBlocks',
	'missedBlocks',
	'fees',
	'rewards',
	'virgin',
];

const Account = stampit({
	props: {
		username: '',
		isDelegate: false,
		u_isDelegate: false,
		secondSignature: false,
		u_secondSignature: false,
		u_username: '',
		address: '',
		publicKey: '',
		secondPublicKey: null,
		balance: '0',
		u_balance: '0',
		vote: '',
		rate: '0',
		delegates: null,
		u_delegates: null,
		multisignatures: null,
		u_multisignatures: null,
		multimin: 0,
		u_multimin: 0,
		multilifetime: 0,
		u_multilifetime: 0,
		nameexist: 0,
		u_nameexist: 0,
		producedBlocks: '9',
		missedBlocks: '0',
		fees: '0',
		rewards: '0',
		virgin: true,
	},
	init({
		isDelegate,
		username,
		u_username,
		address,
		publicKey,
		missedBlocks,
		balance,
	}) {
		this.isDelegate = isDelegate || this.isDelegate;
		this.username = username || randomstring.generate(10).toLowerCase();
		this.u_username = u_username || null;
		this.address =
			address ||
			`${randomstring.generate({ charset: 'numeric', length: 20 })}L`;
		this.publicKey =
			publicKey ||
			randomstring
				.generate({ charset: '0123456789ABCDE', length: 32 })
				.toLowerCase();

		this.vote = randomstring.generate({ charset: '123456789', length: 5 });

		this.missedBlocks = missedBlocks || '0';
		this.balance = balance || '0';

		if (this.isDelegate) {
			this.virgin = false;
		}
	},
});

const dbAccount = stampit({
	props: {
		address: null,
		balance: 0,
		delegates: null,
		fees: '0',
		isDelegate: 0,
		missedBlocks: 0,
		multilifetime: 0,
		multimin: 0,
		multisignatures: null,
		nameexist: 0,
		producedBlocks: 0,
		publicKey: null,
		rate: '0',
		rewards: '0',
		secondPublicKey: null,
		secondSignature: 0,
		u_balance: 0,
		u_delegates: null,
		u_isDelegate: 0,
		u_multilifetime: 0,
		u_multimin: 0,
		u_multisignatures: null,
		u_nameexist: 0,
		u_secondSignature: 0,
		u_username: null,
		username: null,
		virgin: 1,
		vote: '0',
	},
	init({ address, balance, u_balance }) {
		this.address = address || this.address;
		this.balance = balance || this.balance;
		this.u_balance = u_balance || this.u_balance || this.balance;
	},
});

const Delegate = stampit(Account, {
	props: {
		isDelegate: true,
	},
});

const Dependent = stampit({
	init({ accountId, dependentId }) {
		this.accountId = accountId;
		this.dependentId =
			dependentId ||
			randomstring
				.generate({ charset: '0123456789ABCDE', length: 32 })
				.toLowerCase();
	},
});

accounts.Account = Account;
accounts.dbAccount = dbAccount;
accounts.Delegate = Delegate;
accounts.Dependent = Dependent;

module.exports = accounts;
