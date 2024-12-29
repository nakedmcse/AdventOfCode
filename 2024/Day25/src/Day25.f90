! 2024 AoC Day 25
program Day25
    implicit none
    integer, dimension(:,:), allocatable :: locks, keys
    integer :: winners = 0
    integer :: i,j,foundKeys,foundLocks

    call buildLocks(locks, keys, foundLocks, foundKeys)
    do i = 1,foundLocks
        do j = 1,foundKeys
            winners = winners + checkKey(keys(j,1:5),locks(i,1:5))
        end do
    end do

    print *, 'Combos that work:', winners

    contains
        subroutine buildLocks(l,k,countl,countk)
            integer, dimension(:,:), allocatable :: l, k
            integer, dimension(6) :: klbuffer
            integer :: filesize, ios, i, countl, countk
            character(len=5), dimension(7) :: temp

            countl = 0
            countk = 0

            open(unit=10, file='input.txt', status='old')
            inquire(unit=10, size=filesize)
            allocate(l(filesize,5))
            allocate(k(filesize,5))

            do
                do i=1,7
                    read(10, '(A)', iostat=ios) temp(i)
                end do
                if (ios /= 0) exit
                klbuffer = buildCode(temp)
                if(klbuffer(6) == 0) then
                    ! lock
                    countl = countl + 1
                    l(countl, 1:5) = klbuffer(1:5)
                else
                    ! key
                    countk = countk + 1
                    k(countk, 1:5) = klbuffer(1:5)
                end if
                ! skip blank
                read(10, '(A)', iostat=ios) temp(1)
            end do
            close(10)
        end subroutine buildLocks

        function checkKey(k,l) result (res)
            integer, dimension(5) :: k,l
            integer :: i
            integer :: res

            res = 1
            do i=1,5
                if (k(i) + l(i) > 7) then
                    res = 0
                    exit
                end if
            end do
        end function checkKey

        function buildCode(pict) result (res)
            character(len=5), dimension(7) :: pict
            integer, dimension(6) :: res
            integer :: i

            do i=1,5
                res(i) = 0
            end do

            if (index(pict(1),'.') == 0) then
                ! lock
                res(6) = 0
                do i=1,7
                    if (pict(i)(1:1) == '#') res(1) = res(1) + 1
                    if (pict(i)(2:2) == '#') res(2) = res(2) + 1
                    if (pict(i)(3:3) == '#') res(3) = res(3) + 1
                    if (pict(i)(4:4) == '#') res(4) = res(4) + 1
                    if (pict(i)(5:5) == '#') res(5) = res(5) + 1
                end do
            else
                ! key
                res(6) = 1
                do i=7,1,-1
                    if (pict(i)(1:1) == '#') res(1) = res(1) + 1
                    if (pict(i)(2:2) == '#') res(2) = res(2) + 1
                    if (pict(i)(3:3) == '#') res(3) = res(3) + 1
                    if (pict(i)(4:4) == '#') res(4) = res(4) + 1
                    if (pict(i)(5:5) == '#') res(5) = res(5) + 1
                end do
            end if
        end function buildCode
end program Day25