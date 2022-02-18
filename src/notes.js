
[] tokens

[] http://localhost:3000/#/saleitem?itemid=QmS7RFqoUZei5tQZN6XYyyjcvrtk3eHfibQoxJG4bnh3v3

[] id : 1
itemid : xtmPbAuYWE
_balances (1,0x3e125f5d532d2c8cabffe5cd2d7abdae2fef0087) == 28
royalty=150

[] id :2
itemid : __QmfSq1GtsW7Fom2sg1ZytS2pRZHCHexzsJKfE3ARF6dB35
_balances ( tokenid= 2 ,0x90033484a520b20169b60f131b4e2f7f46923faf )==1
royalty = 2

[] id : 3
itemid ; __QmRC3VDrLb2Yn3EAvXa4iP52N9Jgxsk8EFpa4qXwaSvFGU



insert into itembalances (username,itemid,amount,avail,tokenid,decimals,nickname) values (	 '0x90033484a520b20169b60f131b4e2f7f46923faf','__QmfSq1GtsW7Fom2sg1ZytS2pRZHCHexzsJKfE3ARF6dB35'	, 1 , 1 , 2 ,0,'bitalicbuterin' );
[] 
insert into itembalances (username,itemid,amount,avail,tokenid,decimals,nickname) values 
(	 '0x3e125f5d532d2c8cabffe5cd2d7abdae2fef0087','__QmfSq1GtsW7Fom2sg1ZytS2pRZHCHexzsJKfE3ARF6dB35',28,28,1,0,'bitalicbuterin' );
insert into items (itemid,is1copyonly,countcopies,owner,author,authorfee,tokenid,decimals,totalsupply,uuid,categorystr,contract,nettype,active) values ('__QmfSq1GtsW7Fom2sg1ZytS2pRZHCHexzsJKfE3ARF6dB35',1,1,'0x3e125f5d532d2c8cabffe5cd2d7abdae2fef0087','0x3e125f5d532d2c8cabffe5cd2d7abdae2fef0087',150,1,0,1,(select uuid()),'sports','0xB7Aa9cD318e97f42A477DC1D9185fDEC5503E9b5','KLAYTN-TESTNET',1);
