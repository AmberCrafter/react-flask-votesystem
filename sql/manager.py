import sqlite3
import datetime
from sql import lib
# import lib
from typing import Any
from operator import itemgetter
import numpy as np

class SQL:
    '''
    number_vote = contribution/converter
    '''

    def __init__(self,filename=None) -> None:
        self.filename = './sql/data.db' if filename==None else filename 

        pass

    def open(self) -> None:
        self.db = sqlite3.connect(self.filename)
        self.cur = self.db.cursor()
        self.exe = self.cur.execute
        self.fa = self.cur.fetchall
        self.script_create_table()

    def create_table(self,tablename, tableinfo) -> None:
        query = f'create table if not exists {tablename} ({tableinfo});'
        self.exe(query)

    def create_table_member(self):
        tableinfo = '''
            id integer PRIMARY KEY AUTOINCREMENT,
            name text,
            contribution float,
            comment text
        '''
        self.create_table('member', tableinfo)

    def create_table_data(self):
        tableinfo = '''
            id integer PRIMARY KEY AUTOINCREMENT,
            last_update_time datetime,
            id_member int,
            vote_1 int,
            vote_2 int,
            vote_3 int,
            vote_4 int,
            vote_5 int,
            vote_6 int,
            vote_7 int
        '''
        self.create_table('data', tableinfo)

    def create_table_meta(self):
        tableinfo = '''
            id integer PRIMARY KEY AUTOINCREMENT,
            key text,
            value float
        '''
        self.create_table('meta', tableinfo)

    def init_table_meta(self):
        metalist = self.select_all('meta')
        if len(metalist)==0:
            query = "insert into meta (key, value) values ('converter', 1);"
            self.exe(query)
            self.commit()

    def get_member_id(self,name) -> int:
        # get member id
        query = f"select id from member where name='{name}';"
        self.exe(query)
        res = self.fa()[0][0]
        return res

    def insert_member(self,name,contribution,comment):
        # insert member
        query = f"insert into member (name,contribution,comment) values ('{name}', {contribution},'{comment}');"
        self.exe(query)

        # get member id
        ind = self.get_member_id(name)

        formation = "'%Y-%m-%d %H:%M:%S'"
        query = f'insert into data (last_update_time,id_member) values ({datetime.datetime.now().strftime(formation)}, {ind});'
        self.exe(query)
        self.commit()

    def commit(self):
        self.db.commit()

    def close(self):
        self.db.close()

    def new_member(self,name,contribution,comment=None):
        if isinstance(comment, type(None)): comment='null'
        self.insert_member(name,contribution,comment)

    def select_all(self,tablename):
        # header
        query = f'PRAGMA table_info({tablename});'
        self.exe(query)
        header = [val[1] for val in self.fa()]

        # data
        query = f'select * from {tablename};'
        self.exe(query)
        data = self.fa()

        data = lib.wrapper_as_dict(data,header)
        return data

    def select_all_member(self):
        # get meta
        meta = self.select_meta_asjson()

        memberlist = self.select_all('member')

        res = []
        for value in memberlist:
            value['number_vote'] = np.floor(value['contribution']/meta['converter'])
            res.append(value)
        return res

    def select_all_data_withname(self):
        # get meta
        meta = self.select_meta_asjson()

        query = f'''
        select 
            table_data.id,
            table_member.name,
            table_member.contribution,
            table_member.comment,
            table_data.vote_1,
            table_member_1.name,
            table_data.vote_2,
            table_member_2.name,
            table_data.vote_3,
            table_member_3.name,
            table_data.vote_4,
            table_member_4.name,
            table_data.vote_5,
            table_member_5.name,
            table_data.vote_6,
            table_member_6.name,
            table_data.vote_7,
            table_member_7.name,
            table_data.last_update_time
        from data table_data
        inner join member table_member on table_data.id_member = table_member.id
        left join member table_member_1 on table_data.vote_1 = table_member_1.id
        left join member table_member_2 on table_data.vote_2 = table_member_2.id
        left join member table_member_3 on table_data.vote_3 = table_member_3.id
        left join member table_member_4 on table_data.vote_4 = table_member_4.id
        left join member table_member_5 on table_data.vote_5 = table_member_5.id
        left join member table_member_6 on table_data.vote_6 = table_member_6.id
        left join member table_member_7 on table_data.vote_7 = table_member_7.id
        ;
        '''
        self.exe(query)
        dummy = self.fa()
        
        data = []
        for value in dummy:
            data.append(list(value)+[np.floor(value[2]/meta['converter'])])

        header = [
            "id","name","contribution","comment",
            "vote_1_id","vote_1_name",
            "vote_2_id","vote_2_name",
            "vote_3_id","vote_3_name",
            "vote_4_id","vote_4_name",
            "vote_5_id","vote_5_name",
            "vote_6_id","vote_6_name",
            "vote_7_id","vote_7_name",
            "last_update_time",
            "number_vote",
        ]

        data = lib.wrapper_as_dict(data,header)
        return data

    def select_id_data_withname(self,selected_id):
        # get meta
        meta = self.select_meta_asjson()

        query = f'''
        select 
            table_data.id,
            table_member.name,
            table_member.contribution,
            table_member.comment,
            table_data.vote_1,
            table_member_1.name,
            table_data.vote_2,
            table_member_2.name,
            table_data.vote_3,
            table_member_3.name,
            table_data.vote_4,
            table_member_4.name,
            table_data.vote_5,
            table_member_5.name,
            table_data.vote_6,
            table_member_6.name,
            table_data.vote_7,
            table_member_7.name,
            table_data.last_update_time
        from data table_data
        inner join member table_member on table_data.id_member = table_member.id
        left join member table_member_1 on table_data.vote_1 = table_member_1.id
        left join member table_member_2 on table_data.vote_2 = table_member_2.id
        left join member table_member_3 on table_data.vote_3 = table_member_3.id
        left join member table_member_4 on table_data.vote_4 = table_member_4.id
        left join member table_member_5 on table_data.vote_5 = table_member_5.id
        left join member table_member_6 on table_data.vote_6 = table_member_6.id
        left join member table_member_7 on table_data.vote_7 = table_member_7.id
        where table_data.id={selected_id}
        ;
        '''
        self.exe(query)
        dummy = self.fa()
        
        data = []
        for value in dummy:
            data.append(list(value)+[np.floor(value[2]/meta['converter'])])

        header = [
            "id","name","contribution","comment",
            "vote_1_id","vote_1_name",
            "vote_2_id","vote_2_name",
            "vote_3_id","vote_3_name",
            "vote_4_id","vote_4_name",
            "vote_5_id","vote_5_name",
            "vote_6_id","vote_6_name",
            "vote_7_id","vote_7_name",
            "last_update_time",
            "number_vote",
        ]

        data = lib.wrapper_as_dict(data,header)
        return data

    def select_meta_asjson(self):
        query = f'select * from meta;'
        self.exe(query)
        meta = self.fa()
        results = {}
        for (id, key, value) in meta:
            results[key] = value
        return results

    def select_vote_results(self):
        # get meta data
        meta = self.select_meta_asjson()

        # get member information and calculate total contribution value 
        query = f'select * from member;'
        self.exe(query)
        member_info = self.fa() # ((id, name, contribution),...)
        total_contribution = sum([val[2] for val in member_info])
        
        # setup member map
        member_map = {f'{index}': {
            'name': name, 
            'contribution': contribution, 
            'number_vote': np.floor(contribution/meta['converter']), 
            'ratio': contribution/total_contribution, 
            'voted': 0, 
            'number_voted': 0, 
            'rank': 0
            } for (index, name, contribution, comment) in member_info
        }

        # calculate gain votes
        # get vote data
        query = f'select * from data;'
        self.exe(query)
        vote_data = self.fa() # ((id, time, id_member, vote_1, vote_2, vote_3, vote_4, vote_5, vote_6, vote_7),...)
        # calculate gain vote with weighting
        for (id, time, id_member, vote_1, vote_2, vote_3, vote_4, vote_5, vote_6, vote_7) in vote_data:
            vote_list = [val for val in [vote_1, vote_2, vote_3, vote_4, vote_5, vote_6, vote_7] if not isinstance(val, type(None)) if val>0]
            if isinstance(vote_list, type(None)): continue
            if len(vote_list)==0: continue
            vote_ratio = member_map[f'{id_member}']['ratio']/len(vote_list)
            vote_number = member_map[f'{id_member}']['number_vote']/len(vote_list)

            for target in vote_list:
                member_map[f'{target}']['voted'] += vote_ratio
                member_map[f'{target}']['number_voted'] += vote_number
        
        # calculate rank of vote
        rank_table = [[key, member_map[key]['voted']] for key in member_map.keys()] #[[id, vote],...]
        rank_table.sort(key=itemgetter(1), reverse=True)

        # label rank
        pre_vote = 0
        rank = 0
        step = 1
        for (key, vote) in rank_table:
            if pre_vote!=vote:
                rank+=step
                member_map[key]['rank'] = rank
                pre_vote = vote
                step=1
            else:
                member_map[key]['rank'] = rank
                step+=1

        result = []
        for key in member_map.keys():
            member_map[key]['id'] = key
            result.append(member_map[key])

        return result
    
    def select(self,tablename,index,columnname) -> Any:
        query = f'select {columnname} from {tablename} where id={index};'
        self.exe(query)
        data = self.fa()

        header = columnname.split(',')
        data = lib.wrapper_as_dict(data,header)
        return data

    def update_member_name(self,old_name,new_name):
        query = f"update member set name={new_name} where name='{old_name}';"
        try:
            self.exe(query)
            self.commit()
        except Exception as err:
            print(f"[ERROR] Update member name: {err}.")
            raise "[ERROR] Update member name: {err}."

    def update_member_contribution(self,name,new_contribution):
        query = f"update member set contribution={new_contribution} where name='{name}';"
        try:
            self.exe(query)
            self.commit()
        except Exception as err:
            print(f"[ERROR] Update member contribution: {err}.")
            raise "[ERROR] Update member contribution: {err}."

    def update_meta(self,key,value):
        query = f"update meta set value={value} where key='{key}';"
        try:
            self.exe(query)
            self.commit()
        except Exception as err:
            print(f"[ERROR] Update meta converter: {err}.")
            raise f"[ERROR] Update meta converter: {err}."

    def update_member_comment(self,name,comment):
        if isinstance(comment, type(None)): comment='null'
        query = f"update member set comment='{comment}' where name='{name}';"
        try:
            self.exe(query)
            self.commit()
        except Exception as err:
            print(f"[ERROR] Update member comment: {err}.")
            raise f"[ERROR] Update member comment: {err}."


    def update_data_vote(self,voter,n_round,target_id, is_voter_id=False):
        if is_voter_id:
            query = f'update data set vote_{n_round}={target_id} where id_member={voter};'
        else: 
            voter_id = self.get_member_id(voter)
            query = f'update data set vote_{n_round}={target_id} where id_member={voter_id};'
        try:
            self.exe(query)
            self.commit()
        except Exception as err:
            print(f"[ERROR] Update data vote: {err}.")
            raise f"[ERROR] Update data vote: {err}."

    def delect_member(self,name):
        member_id = self.get_member_id(name)
        query = f'delete from member where id={member_id};'
        self.exe(query)
        query = f'delete from data where id={member_id};'
        self.exe(query)
        self.commit()

        # update all vote data
        # query = 'PRAGMA table_info(data);'
        # self.exe(query)
        # header = [val[1] for val in self.fa()]
        query = 'select * from data;'
        self.exe(query)
        data = self.fa()

        for value in data:
            delete_list = [ind for (ind,val) in enumerate(value) if ind>=2 if val==member_id]
            for ind in delete_list:
                round = ind-1
                self.update_data_vote(value[0], round, 'null')

    def frash_table(self, tablename):
        # has a crtical bug, data vote used member_id witch depend on table id
        # need to add another column to exporse index for view, or work this on view side
        query = f'select * from {tablename};'
        self.exe(query)
        data = self.fa()
        
        for ind, value in enumerate(data):
            query = f'update {tablename} set id={ind+1} where id={value[0]};'
            self.exe(query)
        
        # update sequence data table
        query = f"update SQLITE_SEQUENCE set SEQ={ind+1} where NAME='{tablename}';"
        self.exe(query)
        self.commit()

    def script_create_table(self):
        self.create_table_member()
        self.create_table_data()
        self.create_table_meta()
        self.init_table_meta()

    def __del__(self):
        try:
            self.close()
        except:
            pass

def _test():
    sql = SQL('./backend/sql/data.db')
    sql.open()
    # sql.script_create_table()
    # sql.new_member('Amy',1000)
    # sql.new_member('Tom',200)
    # sql.new_member('Annie',300)

    # # sql.update_member_contribution('Amy', 0.99)
    # sql.update_data_vote('Amy',1,3)

    # res = sql.select_all('member')
    # print(res)
    # print("-------------------------------")

    # res = sql.select_all('data')
    # print(res)

    # print("-------------------------------")
    # res = sql.select_all_data_withname()
    # print(res)

    # print("-------------------------------")
    # index=1
    # res = sql.select('data',index,'vote_1')
    # print(f"[data].vote_1: (id: {index}, value: {res})")


    # sql.select_vote_results()
    pass

if __name__=='__main__':
    _test()