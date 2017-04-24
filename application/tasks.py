from celery import task

@task
def debug_task(something):
    print('request: {0|r}'.format(something))
