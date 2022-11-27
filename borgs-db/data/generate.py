# sudo apt install python3-pip
# requirements but only needs to be run once and committed
# python version 3.10.6
# faker version 15.1.1
import csv
from random import randrange, choice
from faker import Faker
import pathlib

path = pathlib.Path(__file__).parent.resolve()

Faker.seed(0)
fake = Faker()

def get_csv_writer(f):
    return csv.writer(f)

def gen_users(num_users):
    available_uids = []
    with open(f'{path}/Users.csv', 'w') as f:
        writer = get_csv_writer(f)
        print('Users...', end=' ', flush=True)
        for uid in range(num_users):
            if uid % 1000 == 0:
                print(f'{uid}', end=' ', flush=True)
            profile = fake.profile()
            password = f'pass{uid}'
            name_components = profile['name'].split(' ')
            firstname = name_components[0]
            lastname = name_components[-1]
            email = name_components[0] + "." + name_components[-1] + "@" + fake.domain_name(1)

            # signalling that this uid can be used in other tables
            available_uids.append(uid) 
            writer.writerow([uid, email, password, firstname, lastname])
        print(f'{num_users} generated')
    return available_uids

def gen_logins(available_uids):
    with open(f'{path}/Logins.csv', 'w') as f:
        writer = get_csv_writer(f)
        num_logins = 0
        print('Logins..', end=' ', flush=True)
        for uid in available_uids:
            for i in range(randrange(35,70,1)): # person can have [35,70] logins
                login_dates = []
                login_date = randrange(1388534400, 1577836800, 1) # 2014-01-01 00:00:00 to 2020-01-01 00:00:00
                
                if login_date not in login_dates:
                    login_dates.append(login_date)
                    writer.writerow([uid, login_date])
                    num_logins += 1
    print(f'{num_logins} login instances generated')
    return

def gen_virtual_accounts(available_uids):
    virtual_account_relations = {}
    with open(f'{path}/VirtualAccounts.csv', 'w') as f:
        writer = get_csv_writer(f)
        print('Virtual accounts...', end=' ', flush=True)
        account_id = 0
        for uid in available_uids:
            virtual_account_relations[uid] = []
            for i in range(randrange(3,5,1)): # person can have [3,5] VAs
                name_options = ["General", "Long-term", "Short-term", "Medium-term", "Emergencies", "Food", "Duke Tuition"]
                names = []
                name = choice(name_options) + " " + fake.city_suffix() + " account"
                
                if name not in names:
                    names.append(name)
                    writer.writerow([account_id, uid, name])
                    virtual_account_relations[uid].append(account_id)
                    account_id += 1
    print(f'{account_id} virtual accounts generated')
    return virtual_account_relations

def gen_physical_accounts(available_uids):
    physical_account_relations = {}
    with open(f'{path}/PhysicalAccounts.csv', 'w') as f:
        writer = get_csv_writer(f)
        print('Physical accounts...', end=' ', flush=True)
        account_id = 0
        for uid in available_uids:
            physical_account_relations[uid] = []
            for i in range(randrange(1,3,1)): # person can have [1,3] PAs
                names = []
                name = fake.credit_card_provider()
                
                if name not in names:
                    names.append(name)
                    writer.writerow([account_id, uid, name])
                    physical_account_relations[uid].append(account_id)
                    account_id += 1

    print(f'{account_id} physical accounts generated')
    return physical_account_relations

def gen_transaction_categories(available_uids):
    category_relations = {}
    category_types = {}
    with open(f'{path}/TransactionsCategories.csv', 'w') as f:
        writer = get_csv_writer(f)
        print('Categories...', end=' ', flush=True)
        category_id = 0
        for uid in available_uids:
            category_relations[uid] = []
            writer.writerow([category_id, None, 'Transfer between accounts', uid, 'TRANSFER'])
            category_id += 1
            writer.writerow([category_id, None, 'Other expenses', uid, 'EXPENSE'])
            category_id += 1
            writer.writerow([category_id, None, 'Other income', uid, 'INCOME'])
            category_id += 1
            for i in range(randrange(1,10,1)): # person can have [1,10] categories
                category_types[category_id] = []
                names = []
                name = fake.color_name()
                
                category_type = choice(['INCOME', 'EXPENSE'])

                if name not in names:
                    names.append(name)
                    category_relations[uid].append(category_id)
                    category_types[category_id].append(category_type)

                    if i > 0 and fake.pybool():
                        parent_category = category_id - 1
                        writer.writerow([category_id, parent_category, name, uid, category_type])
                    else:
                        writer.writerow([category_id, None, name, uid, category_type])

                    category_id += 1

    print(f'{category_id} categories generated')
    return category_relations, category_types

def gen_transactions(virtual_account_relations, physical_account_relations, category_relations, category_types, available_uids):
    transaction_ids_relations = {}
    with open(f'{path}/Transactions.csv', 'w') as f:
        writer = get_csv_writer(f)
        print('Transactions...', end=' ', flush=True)
        transaction_id = 0
        for uid in available_uids:
            transaction_ids_relations[uid] = []
            for i in range(randrange(500,10000,1)): # person can have [500,10000] transactions
                
                virtual_account_id = choice(virtual_account_relations[uid])
                physical_account_id = choice(physical_account_relations[uid])
                value = f'{str(fake.random_int(max=1000, min = 1))}.{fake.random_int(max=99):02}'
                category = choice(category_relations[uid])
                category_type = category_types[category][0]

                if category_type == "EXPENSE":
                    value = f'{str(fake.random_int(max=-1, min = -1000))}.{fake.random_int(max=99):02}'

                timestamp =  randrange(1388534400, 1669521501, 1) # 2014-01-01 00:00:00 to 2020-01-01 00:00:00
                description = fake.bs()
                note = fake.paragraph(nb_sentences=2)

                writer.writerow([transaction_id, virtual_account_id, physical_account_id,
                    value, category, timestamp, description, note, None, None])
                transaction_ids_relations[uid].append(transaction_id)
                transaction_id += 1

    print(f'{transaction_id} transactions generated')
    return transaction_ids_relations

def gen_tags(transaction_ids_relations): 
    with open(f'{path}/Tags.csv', 'w') as f:
        writer = get_csv_writer(f)
        print('Tags...', end=' ', flush=True)
        num_tags = 0
        for uid in transaction_ids_relations: 
            transactions = transaction_ids_relations[uid]

            for transaction in transactions:
                tags = [f'tag 1 from person {uid}', f'tag 2 from person {uid}',
                                    f'tag 3 from person {uid}', f'tag 4 from person {uid}',
                                    f'murilo suks {uid}', f'enzo is cool {uid}']

                used_tags = []
                for i in range(randrange(1,3,1)): # transactions have up to 3 tags
                    tag = choice(tags)
                    if tag not in used_tags:
                        used_tags.append(tag)
                        writer.writerow([tag, transaction])
                        num_tags += 1

        print(f'{num_tags} non-unique tags generated')
    return


available_uids = gen_users(int(input("Input amount of users: ")))

gen_logins(available_uids)

virtual_account_relations = gen_virtual_accounts(available_uids)

physical_account_relations = gen_physical_accounts(available_uids)

category_relations, category_types = gen_transaction_categories(available_uids)

transaction_ids_relations = gen_transactions(virtual_account_relations, physical_account_relations, category_relations, category_types, available_uids)

gen_tags(transaction_ids_relations)