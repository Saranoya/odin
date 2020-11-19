class Book
    attr_reader :title

    def title=(t)
        tmp = []
        words = t.split
        for i in 0...words.length do 
            (words[i].length < 3 && words[i] != 'i' || words[i] =~ /^and|the$/ ) && i != 0 && i != words.length-1 ? tmp << words[i] : tmp << words[i].capitalize
        end
        @title = tmp.join(" ")
    end
end
